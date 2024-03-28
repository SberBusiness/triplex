import React from 'react';
import moment from 'moment';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента CalendarViewMonths. */
export interface ICalendarViewMonthsProps {
    /** Дата, являющаяся курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата. */
    pickedDate: TPickedDate;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** HTML атрибуты месяца. */
    monthHtmlAttributes?: React.HTMLAttributes<HTMLTableCellElement>;
    /** Callback-функция выбора месяца. */
    onClick(month: number): void;
}

/** Вид календаря с выбором месяца. */
export const CalendarViewMonths: React.FC<ICalendarViewMonthsProps> = ({
    viewDate,
    pickedDate,
    limitRange = globalLimitRange,
    monthHtmlAttributes,
    onClick,
}) => {
    const monthsShort = moment.monthsShort();

    /** Отрисовка месяца. */
    const renderMonth = (row: number, cell: number) => {
        const month = row * 3 + cell;
        const active = isActiveMonth(month);
        const disabled = isDisabledMonth(month);
        const classNames = classnames('cssClass[calendarMonth]', {
            'cssClass[active]': active,
            'cssClass[disabled]': disabled,
        });

        return (
            <td
                key={`calendar-view-months-cell-${cell}`}
                {...monthHtmlAttributes}
                className={classNames}
                onClick={!disabled ? handleMonthClick(cell) : undefined}
            >
                {monthsShort[month]}
            </td>
        );
    };

    /** Проверяет, является ли месяц активным. */
    const isActiveMonth = (month: number): boolean => {
        if (pickedDate == null) {
            return false;
        }

        return pickedDate.year() == viewDate.year() && pickedDate.month() == month;
    };

    /** Проверяет, является ли месяц отключенным. */
    const isDisabledMonth = (month: number): boolean => {
        const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
        const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

        return viewDate.month(month).isBefore(dateFrom) || viewDate.month(month).isAfter(dateTo);
    };

    /** Обработчик выбора месяца. */
    const handleMonthClick = (month: number) => () => onClick(month);

    return (
        <table className="cssClass[calendarViewMonths]">
            <tbody>
                {[0, 1, 2, 3].map((row) => (
                    <tr key={`calendar-view-months-row-${row}`}>{[0, 1, 2].map((cell) => renderMonth(row, cell))}</tr>
                ))}
            </tbody>
        </table>
    );
};
