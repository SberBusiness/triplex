import React, {useState, useEffect, useContext, useCallback} from 'react';
import moment from 'moment';
import {ICalendarViewProps} from '@sberbusiness/triplex/components/Calendar/components/CalendarView';
import {dateFormatYYYYMMDD, globalLimitRange, WEEKDAYS_SET} from '@sberbusiness/triplex/consts/DateConst';
import {CalendarViewContext} from '@sberbusiness/triplex/components/Calendar/CalendarViewContext';
import {CalendarViewItem} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewItem';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';

/** Свойства компонента CalendarViewDays. */
export interface ICalendarViewDaysProps extends Omit<ICalendarViewProps, 'viewMode' | 'monthHtmlAttributes' | 'yearHtmlAttributes'> {}

/** Вид календаря с выбором дня. */
export const CalendarViewDays: React.FC<ICalendarViewDaysProps> = ({
    viewDate,
    pickedDate,
    pickedRange,
    limitRange,
    periodId,
    disabledDays,
    markedDays,
    dayHtmlAttributes = {},
    onDateSelect,
    onPageChange,
}) => {
    const {viewItemFocusedRef} = useContext(CalendarViewContext);
    const startDate = viewDate.clone().startOf('month').startOf('week');

    /** Проверяет, выходит ли дата за разрешённый период. */
    const isOutOfRangeDate = useCallback(
        (date: moment.Moment) => {
            const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
            const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

            return date.isBefore(dateFrom, 'day') || date.isAfter(dateTo, 'day');
        },
        [limitRange.dateFrom, limitRange.dateTo]
    );

    /** Проверяет, является ли дата отключенной. */
    const isDisabledDate = useCallback(
        (date: moment.Moment) => {
            if (isOutOfRangeDate(date)) {
                return true;
            }

            if (disabledDays) {
                return disabledDays.includes(date.format(dateFormatYYYYMMDD));
            }

            return false;
        },
        [disabledDays, isOutOfRangeDate]
    );

    /** Получить первую доступную для фокуса дату. */
    const getInitialTabbableDate = useCallback(() => {
        if (pickedDate && pickedDate.isSame(viewDate, 'month')) {
            return pickedDate;
        } else {
            const date = viewDate.clone().startOf('month');

            for (let i = 0; i < date.daysInMonth(); i++) {
                date.add(i, 'day');

                if (!isDisabledDate(date)) {
                    return date;
                }
            }
        }
    }, [pickedDate, viewDate, isDisabledDate]);

    const [tabbableDate, setTabbableDate] = useState(getInitialTabbableDate());

    useEffect(() => {
        if (!viewItemFocusedRef.current) {
            setTabbableDate(getInitialTabbableDate());
        }
    }, [viewDate, viewItemFocusedRef, getInitialTabbableDate]);

    /** Рендер заголовка таблицы. */
    const renderTableHead = () => {
        const weekdays = moment.weekdays(true);
        const weekdaysMin = moment.weekdaysMin(true);

        return (
            <thead>
                <tr>
                    {WEEKDAYS_SET.map((header) => (
                        <th key={`calendar-table-header-${header}`} className="cssClass[calendarViewDaysHeader]" abbr={weekdays[header]}>
                            {weekdaysMin[header]}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    /** Рендер тела таблицы. */
    const renderTableBody = () => (
        <tbody className="cssClass[calendarViewDaysBody]">
            {[0, 1, 2, 3, 4, 5].map((row) => (
                <tr key={`calendar-table-row-${row}`}>{[0, 1, 2, 3, 4, 5, 6].map((cell) => renderTableData(row, cell))}</tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const date = moment(startDate).add(row * 7 + cell, 'day');
        const classNames = classnames({
            'cssClass[current]': isCurrentDate(date),
            'cssClass[rangeBetween]': isRangeBetweenDate(date),
            'cssClass[rangeEnd]': isRangeEndDate(date),
            'cssClass[rangeStart]': isRangeStartDate(date),
        });
        const active = isActiveDate(date);
        const disabled = isDisabledDate(date);
        const tabbable = !disabled && isTabbableDay(date);
        const muted = isMutedDate(date);
        const marked = isMarkedDate(date);

        return (
            <CalendarViewItem
                key={`calendar-table-data-${cell}`}
                className={classNames}
                {...(typeof dayHtmlAttributes == 'function' ? dayHtmlAttributes({marked}) : dayHtmlAttributes)}
                date={date}
                unit="day"
                active={active}
                disabled={disabled}
                tabbable={tabbable}
                muted={muted}
                marked={marked}
                onKeyDown={handleItemKeyDown(date)}
                onDateSelect={handleDateSelect}
            >
                {date.date()}
            </CalendarViewItem>
        );
    };

    /** Проверяет, может ли дата получить фокус при навигации. */
    const isTabbableDay = (date: moment.Moment) => {
        if (tabbableDate) {
            return date.isSame(tabbableDate, 'day');
        }

        return false;
    };

    /** Проверяет, относится ли дата к текущему месяцу. */
    const isMutedDate = (date: moment.Moment) => {
        return !date.isSame(viewDate, 'month');
    };

    /** Проверяет, является ли дата сегодняшней. */
    const isCurrentDate = (date: moment.Moment) => {
        return date.isSame(moment(), 'day');
    };

    /** Проверяет, является ли дата активной. */
    const isActiveDate = (date: moment.Moment) => {
        if (pickedRange) {
            return !!(pickedRange[0]?.isSame(date, 'day') || pickedRange[1]?.isSame(date, 'day'));
        } else {
            return !!pickedDate && date.isSame(pickedDate, 'day');
        }
    };

    /** Проверяет, является ли дата отмеченной. */
    const isMarkedDate = (date: moment.Moment) => {
        if (markedDays) {
            return markedDays.includes(date.format(dateFormatYYYYMMDD));
        }

        return false;
    };

    /** Проверяет, является ли дата началом выбранного периода. */
    const isRangeStartDate = (date: moment.Moment) => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return pickedRange[0].isSame(date, 'day');
    };

    /** Проверяет, является ли дата концом выбранного периода. */
    const isRangeEndDate = (date: moment.Moment) => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return pickedRange[1].isSame(date, 'day');
    };

    /** Проверяет, является ли дата промежуточной в выбранном периоде. */
    const isRangeBetweenDate = (date: moment.Moment) => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return date.isBetween(pickedRange[0], pickedRange[1], 'day');
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (currentDate: moment.Moment, operation: 'add' | 'subtract', amount: number, unit: 'day' | 'week' | 'month') => {
        const day = currentDate.clone();
        const shiftDay = {
            add: moment.fn.add.bind(day),
            subtract: moment.fn.subtract.bind(day),
        }[operation];

        while (shiftDay(amount, unit)) {
            // Если вышли за пределы доступного периода – возвращаем текущий день.
            if (isOutOfRangeDate(day)) {
                return currentDate;
            }
            // Если день доступен для выбора – выходим из поиска.
            if (!isDisabledDate(day)) {
                break;
            }
        }

        return day;
    };

    /** Обработчик нажатия клавиши CalendarViewItem. */
    const handleItemKeyDown = (date: moment.Moment) => (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const key = event.code || event.keyCode;
        let nextFocusedDate;

        if (isKey(key, 'ARROW_RIGHT')) {
            nextFocusedDate = getShiftedDate(date, 'add', 1, 'day');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_LEFT')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 1, 'day');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_DOWN')) {
            nextFocusedDate = getShiftedDate(date, 'add', 1, 'week');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_UP')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 1, 'week');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_DOWN')) {
            nextFocusedDate = getShiftedDate(date, 'add', 1, 'month');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_UP')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 1, 'month');
            event.preventDefault();
        }

        if (nextFocusedDate) {
            changeTabbableDate(nextFocusedDate);
        }
    };

    /** Обработчик клика по дате. */
    const handleDateSelect = (date: moment.Moment) => {
        onDateSelect(date);
    };

    /** Изменение фокусируемой даты. */
    const changeTabbableDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.isBefore(viewDate, 'month')) {
            date = viewDate.clone().subtract(1, 'month');
            onPageChange(date, ECalendarViewMode.DAYS);
        } else if (date.isAfter(viewDate, 'month')) {
            date = viewDate.clone().add(1, 'month');
            onPageChange(date, ECalendarViewMode.DAYS);
        }
    };

    return (
        <table className="cssClass[calendarViewDays]" role="grid" aria-labelledby={periodId}>
            {renderTableHead()}
            {renderTableBody()}
        </table>
    );
};
