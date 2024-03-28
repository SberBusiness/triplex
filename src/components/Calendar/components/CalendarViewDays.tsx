import React from 'react';
import moment from 'moment';
import {TPickedDate, TPickedRange, TDayHtmlAttributes} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {WEEKDAYS_SET, globalLimitRange, dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import {CalendarDay} from '@sberbusiness/triplex/components/Calendar/components/CalendarDay';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента CalendarViewDays. */
export interface ICalendarViewDaysProps {
    /** Дата, являющаяся курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата. */
    pickedDate: TPickedDate;
    /** Отображаемый период. */
    pickedRange?: TPickedRange;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** HTML атрибуты дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключённые дни. */
    disabledDays?: string[];
    /** День, доступный для фокусировки в текущий момент при навигации с клавиатуры. */
    tabbableDay?: moment.Moment;
    /** День, находящийся в фокусе в текущий момент при навигации с клавиатуры. */
    focusedDay?: moment.Moment;
    /** Идентификатор для связи календаря и наименования текущего периода. */
    periodId?: string;
    /** Callback-функция выбора дня. */
    onClick(day: moment.Moment): void;
    /** Callback-функция изменения дня для фокуса. */
    onChangeFocusedDay(focusedDay?: moment.Moment, byKeyDown?: boolean): void;
}

/** Вид календаря с выбором дня. */
export const CalendarViewDays: React.FC<ICalendarViewDaysProps> = ({
    viewDate,
    pickedDate,
    pickedRange,
    limitRange = globalLimitRange,
    dayHtmlAttributes,
    tabbableDay,
    focusedDay,
    markedDays,
    disabledDays,
    periodId,
    onClick,
    onChangeFocusedDay,
}) => {
    const startDate = moment(viewDate).startOf('month').startOf('week');

    /** Отрисовка дней недели. */
    const renderDaysOfWeek = () => {
        const weekdays = moment.weekdays(true);
        const weekdaysMin = moment.weekdaysMin(true);

        return (
            <tr>
                {WEEKDAYS_SET.map((header) => (
                    <th key={`calendar-view-days-header-${header}`} className="cssClass[calendarViewDaysHeader]" abbr={weekdays[header]}>
                        {weekdaysMin[header]}
                    </th>
                ))}
            </tr>
        );
    };

    /** Отрисовка дня. */
    const renderDay = (row: number, cell: number) => {
        const date = moment(startDate).add(row * 7 + cell, 'day');

        return (
            <CalendarDay
                key={`calendar-view-days-cell-${cell}`}
                tabbable={isTabbableDay(date)}
                focused={isFocusedDay(date)}
                muted={isMutedDay(date)}
                current={isCurrentDay(date)}
                active={isActiveDay(date)}
                marked={isMarkedDay(date)}
                disabled={isDisabledDay(date)}
                rangeStart={isRangeStartDay(date)}
                rangeEnd={isRangeEndDay(date)}
                rangeBetween={isRangeBetweenDay(date)}
                htmlAttributes={dayHtmlAttributes}
                onFocus={handleFocusDay(date)}
                onKeyDown={handleKeyDownDay(date)}
                onClick={handleClickDay(date)}
            >
                {date.date()}
            </CalendarDay>
        );
    };

    /** Проверяет, доступен ли день для фокусировки с клавиатуры. */
    const isTabbableDay = (date: moment.Moment) => {
        if (tabbableDay) {
            return date.isSame(tabbableDay, 'day');
        }

        return false;
    };

    /** Проверяет, является ли день в фокусе. */
    const isFocusedDay = (date: moment.Moment) => {
        if (focusedDay) {
            return date.isSame(focusedDay, 'day');
        }

        return false;
    };

    /** Проверяет, относится ли день к текущему месяцу. */
    const isMutedDay = (date: moment.Moment) => {
        return !date.isSame(viewDate, 'month');
    };

    /** Проверяет, является ли день сегодняшним. */
    const isCurrentDay = (date: moment.Moment) => {
        return date.isSame(moment(), 'day');
    };

    /** Проверяет, является ли месяц активным. */
    const isActiveDay = (date: moment.Moment) => {
        if (pickedRange) {
            return !!(pickedRange[0]?.isSame(date, 'day') || pickedRange[1]?.isSame(date, 'day'));
        } else {
            return !!pickedDate && date.isSame(pickedDate, 'day');
        }
    };

    /** Проверяет, является ли месяц отмеченным. */
    const isMarkedDay = (date: moment.Moment) => {
        if (markedDays) {
            return markedDays.includes(date.format(dateFormatYYYYMMDD));
        }

        return false;
    };

    /** Проверяет, является ли день отключенным. */
    const isDisabledDay = (date: moment.Moment) => {
        if (isOutOfRangeDay(date)) {
            return true;
        }

        if (disabledDays) {
            return disabledDays.includes(date.format(dateFormatYYYYMMDD));
        }

        return false;
    };

    /** Проверяет, принадлежит ли день к разрешённому периоду. */
    const isOutOfRangeDay = (date: moment.Moment) => {
        const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
        const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

        return date.isBefore(dateFrom) || date.isAfter(dateTo);
    };

    /** Проверяет, является ли день началом выбранного периода. */
    const isRangeStartDay = (date: moment.Moment): boolean => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return pickedRange[0].isSame(date, 'day');
    };

    /** Проверяет, является ли день концом выбранного периода. */
    const isRangeEndDay = (date: moment.Moment): boolean => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return pickedRange[1].isSame(date, 'day');
    };

    /** Проверяет, находится ли день между началом/концом выбранного периода. */
    const isRangeBetweenDay = (date: moment.Moment): boolean => {
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }

        return date.isBetween(pickedRange[0], pickedRange[1], 'day');
    };

    /** Возвращает доступный для выбора день после сдвига. */
    const getShiftedDay = (current: moment.Moment, operation: 'add' | 'subtract', amount: number, unit: 'day' | 'week' | 'month') => {
        const day = moment(current);
        const shiftDay = {
            add: moment.fn.add.bind(day),
            subtract: moment.fn.subtract.bind(day),
        }[operation];

        while (shiftDay(amount, unit)) {
            // Если вышли за пределы доступного периода – возвращаем текущий день.
            if (isOutOfRangeDay(day)) {
                return current;
            }
            // Если день доступен для выбора – выходим из поиска.
            if (!isDisabledDay(day)) {
                break;
            }
        }

        return day;
    };

    /** Обработчик получения фокуса днём. */
    const handleFocusDay = (day: moment.Moment) => () => {
        onChangeFocusedDay(day);
    };

    /** Обработчик нажатия клавиши по дню. */
    const handleKeyDownDay = (day: moment.Moment) => (event: React.KeyboardEvent<HTMLTableDataCellElement>) => {
        const key = event.code || event.keyCode;
        let newFocusedDay;
        let newSelectedDate;

        if (isKey(key, 'SPACE') || isKey(key, 'ENTER')) {
            newSelectedDate = day;
            event.preventDefault();
        } else if (isKey(key, 'ARROW_RIGHT')) {
            newFocusedDay = getShiftedDay(day, 'add', 1, 'day');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_LEFT')) {
            newFocusedDay = getShiftedDay(day, 'subtract', 1, 'day');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_DOWN')) {
            newFocusedDay = getShiftedDay(day, 'add', 1, 'week');
            event.preventDefault();
        } else if (isKey(key, 'ARROW_UP')) {
            newFocusedDay = getShiftedDay(day, 'subtract', 1, 'week');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_DOWN')) {
            newFocusedDay = getShiftedDay(day, 'add', 1, 'month');
            event.preventDefault();
        } else if (isKey(key, 'PAGE_UP')) {
            newFocusedDay = getShiftedDay(day, 'subtract', 1, 'month');
            event.preventDefault();
        }

        if (newFocusedDay) {
            onChangeFocusedDay(newFocusedDay, true);
        }

        if (newSelectedDate) {
            onClick(newSelectedDate);
        }
    };

    /** Обработчик клика по дню. */
    const handleClickDay = (day: moment.Moment) => () => {
        onClick(day);
    };

    return (
        <table className="cssClass[calendarViewDays]" role="grid" aria-labelledby={periodId}>
            <thead className="cssClass[calendarViewDaysHead]">{renderDaysOfWeek()}</thead>
            <tbody className="cssClass[calendarViewDaysBody]">
                {[0, 1, 2, 3, 4, 5].map((row) => (
                    <tr key={`calendar-view-days-row-${row}`}>{[0, 1, 2, 3, 4, 5, 6].map((cell) => renderDay(row, cell))}</tr>
                ))}
            </tbody>
        </table>
    );
};
