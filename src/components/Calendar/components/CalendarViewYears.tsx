import React from 'react';
import moment from 'moment';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента CalendarViewYears. */
export interface ICalendarViewYearsProps {
    /** Дата, являющаяся курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата. */
    pickedDate: TPickedDate;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** HTML атрибуты года. */
    yearHtmlAttributes?: React.HTMLAttributes<HTMLTableCellElement>;
    /** Callback-функция выбора года. */
    onClick(year: number): void;
}

/** Вид календаря с выбором года. */
export const CalendarViewYears: React.FC<ICalendarViewYearsProps> = ({
    viewDate,
    pickedDate,
    limitRange = globalLimitRange,
    yearHtmlAttributes,
    onClick,
}) => {
    const currentYear = viewDate.year();

    /** Отрисовка года. */
    const renderYear = (row: number, cell: number) => {
        const year = currentYear + row * 3 + cell - 5;
        const active = isActiveYear(year);
        const disabled = isDisabledYear(year);
        const classNames = classnames('cssClass[calendarYear]', {
            'cssClass[active]': active,
            'cssClass[disabled]': disabled,
        });

        return (
            <td
                key={`calendar-view-years-cell-${cell}`}
                {...yearHtmlAttributes}
                className={classNames}
                onClick={!disabled ? handleYearClick(year) : undefined}
            >
                {year}
            </td>
        );
    };

    /** Проверяет, является ли год активным. */
    const isActiveYear = (year: number): boolean => {
        if (pickedDate == null) {
            return false;
        }

        return pickedDate.year() == year;
    };

    /** Проверяет, является ли год отключенным. */
    const isDisabledYear = (year: number): boolean => {
        const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
        const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

        return viewDate.year(year).isBefore(dateFrom) || viewDate.year(year).isAfter(dateTo);
    };

    /** Обработчик выбора года. */
    const handleYearClick = (year: number) => () => onClick(year);

    return (
        <table className="cssClass[calendarViewYears]">
            <tbody>
                {[0, 1, 2, 3].map((row) => (
                    <tr key={`calendar-view-years-row-${row}`}>{[0, 1, 2].map((cell) => renderYear(row, cell))}</tr>
                ))}
            </tbody>
        </table>
    );
};
