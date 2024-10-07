import React, {useState, useEffect, useContext, useCallback} from 'react';
import moment from 'moment';
import {ICalendarViewProps} from '@sberbusiness/triplex/components/Calendar/components/CalendarView';
import {globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {CalendarViewContext} from '@sberbusiness/triplex/components/Calendar/CalendarViewContext';
import {CalendarViewItem} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewItem';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {ECalendarPickType, ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';

/** Свойства компонента CalendarViewMonths. */
export interface ICalendarViewMonthsProps extends Omit<ICalendarViewProps, 'viewMode' | 'dayHtmlAttributes' | 'yearHtmlAttributes'> {}

/** Вид календаря с выбором месяца. */
export const CalendarViewMonths: React.FC<ICalendarViewMonthsProps> = ({
    viewDate,
    pickedDate,
    limitRange,
    pickType,
    periodId,
    monthHtmlAttributes = {},
    onDateSelect,
    onPageChange,
    onViewChange,
}) => {
    const {viewItemFocusedRef} = useContext(CalendarViewContext);
    const monthsShort = moment.monthsShort();

    /** Проверяет, выходит ли дата за разрешённый период. */
    const isOutOfRangeDate = useCallback(
        (date: moment.Moment) => {
            const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
            const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

            return date.isBefore(dateFrom, 'month') || date.isAfter(dateTo, 'month');
        },
        [limitRange.dateFrom, limitRange.dateTo]
    );

    /** Проверяет, является ли дата отключенной. */
    const isDisabledDate = useCallback(
        (date: moment.Moment) => {
            return isOutOfRangeDate(date);
        },
        [isOutOfRangeDate]
    );

    /** Получить первую доступную для фокуса дату. */
    const getInitialTabbableDate = useCallback(() => {
        if (pickedDate && pickedDate.isSame(viewDate, 'year')) {
            return pickedDate;
        } else {
            const date = viewDate.clone().startOf('year');

            for (let i = 0; i < 12; i++) {
                date.add(i, 'month');

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

    /** Рендер тела таблицы. */
    const renderTableBody = () => (
        <tbody>
            {[0, 1, 2, 3].map((row) => (
                <tr key={`calendar-view-months-row-${row}`}>{[0, 1, 2].map((cell) => renderTableData(row, cell))}</tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const month = row * 3 + cell;
        const date = viewDate.clone().startOf('month').month(month);
        const active = isActiveDate(date);
        const disabled = isDisabledDate(date);
        const tabbable = !disabled && isTabbableDate(date);

        return (
            <CalendarViewItem
                key={`calendar-table-data-${cell}`}
                {...monthHtmlAttributes}
                date={date}
                unit="month"
                active={active}
                disabled={disabled}
                tabbable={tabbable}
                onKeyDown={handleItemKeyDown(date)}
                onDateSelect={handleDateSelect}
            >
                {monthsShort[month]}
            </CalendarViewItem>
        );
    };

    /** Проверяет, является ли дата активной. */
    const isActiveDate = (date: moment.Moment) => {
        if (pickedDate == null) {
            return false;
        }

        return pickedDate.isSame(date, 'month');
    };

    /** Проверяет, может ли дата получить фокус при навигации. */
    const isTabbableDate = (date: moment.Moment) => {
        if (tabbableDate) {
            return date.isSame(tabbableDate, 'month');
        }

        return false;
    };

    /** Обработчик нажатия клавиши CalendarViewItem. */
    const handleItemKeyDown = (date: moment.Moment) => (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const key = event.code || event.keyCode;
        let nextFocusedDate;

        if (isKey(key, 'ARROW_RIGHT')) {
            nextFocusedDate = getShiftedDate(date, 'add', 1, 'month');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_LEFT')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 1, 'month');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_DOWN')) {
            nextFocusedDate = getShiftedDate(date, 'add', 3, 'month');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_UP')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 3, 'month');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_DOWN')) {
            nextFocusedDate = getShiftedDate(date, 'add', 1, 'year');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_UP')) {
            nextFocusedDate = getShiftedDate(date, 'subtract', 1, 'year');
            event.preventDefault();
        }

        if (nextFocusedDate) {
            changeTabbableDate(nextFocusedDate);
        }
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (currentDate: moment.Moment, operation: 'add' | 'subtract', amount: number, unit: 'month' | 'year') => {
        const date = currentDate.clone();
        const shiftDate = {
            add: moment.fn.add.bind(date),
            subtract: moment.fn.subtract.bind(date),
        }[operation];

        shiftDate(amount, unit);

        if (isOutOfRangeDate(date)) {
            return currentDate;
        }

        return date;
    };

    /** Обработчик выбора даты. */
    const handleDateSelect = (date: moment.Moment) => {
        if (pickType === ECalendarPickType.monthYearPick) {
            onDateSelect(date);
        } else {
            onViewChange(date, ECalendarViewMode.DAYS);
        }
    };

    /** Изменение фокусируемой даты. */
    const changeTabbableDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.isBefore(viewDate, 'year')) {
            date = viewDate.clone().subtract(1, 'year');
            onPageChange(date, ECalendarViewMode.MONTHS);
        } else if (date.isAfter(viewDate, 'year')) {
            date = viewDate.clone().add(1, 'year');
            onPageChange(date, ECalendarViewMode.MONTHS);
        }
    };

    return (
        <table className="cssClass[calendarViewMonths]" role="grid" aria-labelledby={periodId}>
            {renderTableBody()}
        </table>
    );
};
