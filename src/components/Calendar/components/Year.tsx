import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import moment, {Moment} from 'moment';
import React from 'react';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';

/**
 * @prop viewDate Дата является курсором, для навигации по интерфейсу.
 * @prop pickedDate Выбранная дата.
 * @prop onClick Обработчик клика по элементу.
 * @prop [limitRange] Ограничение выбираемого периода.
 * @prop [className] Дополнительные CSS-классы.
 * @prop [monthHtmlAttributes] HTML атрибуты компонента месяца.
 */
export interface IProps {
    viewDate: Moment;
    pickedDate: TPickedDate;
    onClick(month: number): void;
    limitRange?: IDateLimitRange;
    className?: string;
    monthHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

/** Компонент выбора месяцев года. */
export class Year extends React.Component<IProps> {
    /**
     * Обработка выбора месяца.
     * @param {number} month
     */
    public handleClick = (month: number): React.MouseEventHandler<HTMLDivElement> => () => this.props.onClick(month);

    /**
     * Проверяет, является ли месяц выбранным.
     * @param {number} monthNumber Номер проверяемого месяца.
     */
    public isPickedMonth = (monthNumber: number): boolean => {
        const {pickedDate, viewDate} = this.props;

        if (!pickedDate) {
            return false;
        }

        return pickedDate.year() === viewDate.year() && pickedDate.month() === monthNumber;
    };

    /** Отрисовать месяцы. */
    public renderMonthsRow = (): JSX.Element[] => {
        const {limitRange, viewDate, monthHtmlAttributes} = this.props;
        const pickedDate = this.props.pickedDate || moment();

        return pickedDate
            .localeData()
            .monthsShort()
            .map((month: string, i: number) => {
                const isDisabledByLimitRange = Boolean(
                    (limitRange &&
                        limitRange.dateFrom &&
                        viewDate.month(i).isBefore(limitRange.dateFrom) &&
                        !viewDate.month(i).isSame(limitRange.dateFrom, 'month')) ||
                        (limitRange &&
                            limitRange.dateTo &&
                            viewDate.month(i).isAfter(limitRange.dateTo) &&
                            !viewDate.month(i).isSame(limitRange.dateTo, 'month'))
                );
                const classNameMonth = classnames('cssClass[calendarTableItem]', {
                    'cssClass[calendarTableItemActive]': this.isPickedMonth(i),
                    'cssClass[calendarTableItemDisabled]': isDisabledByLimitRange,
                    'cssClass[calendarTableItemLastLine]': i > 8,
                });
                return (
                    <div
                        {...monthHtmlAttributes}
                        key={i}
                        className={classNameMonth}
                        onClick={isDisabledByLimitRange ? undefined : this.handleClick(i)}
                    >
                        {month}
                    </div>
                );
            });
    };

    public render(): JSX.Element {
        return <div className="cssClass[calendarYearTable]">{this.renderMonthsRow()}</div>;
    }
}
