import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {globalLimitRange, YEARS_SET} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import {Moment} from 'moment';
import * as React from 'react';
import {TPickedDate} from '@sberbusiness/triplex/desktop/components/Calendar/types';

/**
 * @prop viewDate Дата является курсором, для навигации по интерфейсу.
 * @prop pickedDate Выбранная дата.
 * @prop onClick Обработчик клика по элементу.
 * @prop [yearHtmlAttributes] HTML атрибуты компонента года.
 */
export interface IProps {
    viewDate: Moment;
    pickedDate: TPickedDate;
    onClick(year: number): void;
    yearHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

/** Компонент выбора года. */
export class Decade extends React.Component<IProps> {
    /**
     * Обработчик выбора года.
     * @param {number} year Выбранный год.
     */
    public handleClick = (year: number): React.MouseEventHandler<HTMLDivElement> => () => this.props.onClick(year);

    /**
     * Проверяет, является ли год выбранным.
     * @param {Moment} date Проверяемая дата.
     */
    public isPickedYear = (date: Moment): boolean => {
        const {pickedDate} = this.props;
        return !!pickedDate && date.isSame(pickedDate, 'y');
    };

    /** Отрисовка годов. */
    public renderYears = (): JSX.Element[] => {
        const {yearHtmlAttributes} = this.props;
        const viewDate = this.props.viewDate.clone();

        return YEARS_SET.map((offset, i) => {
            const {dateFrom, dateTo} = globalLimitRange;
            const currentYear: Moment = viewDate.clone().add(offset, 'year');

            if (currentYear.isBetween(dateFrom, dateTo)) {
                const classNameYear = classnames('cssClass[calendarTableItem]', {
                    'cssClass[calendarTableItemActive]': this.isPickedYear(currentYear),
                });
                return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                        {...yearHtmlAttributes}
                        onClick={this.handleClick(currentYear.year())}
                        className={classNameYear}
                        key={`${offset}-${i}`}
                    >
                        {currentYear.year()}
                    </div>
                );
            }

            const classNameYear = classnames('cssClass[calendarTableItem]', 'cssClass[calendarTableItemDisabled]');
            return (
                <div className={classNameYear} key={`${offset}-${i}`}>
                    {currentYear.year()}
                </div>
            );
        });
    };

    public render(): JSX.Element {
        return <div className="cssClass[calendarDecadeTable]">{this.renderYears()}</div>;
    }
}
