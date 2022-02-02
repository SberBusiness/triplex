import {WEEKS_SET} from '@sbbol/web-library/desktop/common/consts/DateConst';
import {IDateLimitRange} from '@sbbol/web-library/desktop/common/types/DateTypes';
import {TPickedRange} from '@sbbol/web-library/desktop/components/Calendar/types';
import {DaysOfWeek} from '@sbbol/web-library/desktop/components/Calendar/components/DaysOfWeek';
import {Week} from '@sbbol/web-library/desktop/components/Calendar/components/Week';
import moment, {Moment} from 'moment';
import * as React from 'react';
import {TPickedDate} from '@sbbol/web-library/desktop/components/Calendar/types';

/**
 * @prop viewDate Дата является курсором, для навигации по интерфейсу.
 * @prop [limitRange] Ограничение выбираемого периода.
 * @prop [markedDays] Отмеченные дни.
 * @prop [disabledDays] Отключённые дни.
 * @prop pickedDate Выбранная дата.
 * @prop onClick Обработчик выбора даты.
 * @prop onPickNextMonth Обработчик выбора следующего месяца.
 * @prop onPickPreviousMonth Обработчик выбора предыдущего месяца.
 * @prop [dayHtmlAttributes] HTML атрибуты компонента дня.
 * @prop [pickedRange] Отображаемый период.
 */
export interface ICalendarMonthProps {
    viewDate: Moment;
    limitRange?: IDateLimitRange;
    markedDays?: string[];
    disabledDays?: string[];
    pickedDate: TPickedDate;
    onClick(date: Moment): void;
    onPickNextMonth(): void;
    onPickPreviousMonth(): void;
    dayHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
    pickedRange?: TPickedRange;
}

/**
 * Проверяет, относится ли неделя к текущему месяцу.
 * @param date Проверяемая дата.
 * @param startOfWeek Дата начала недели.
 */
const isWeekInMonth = (date: Moment, startOfWeek: Moment): boolean => {
    const endOfWeek: Moment = startOfWeek.clone().add(6, 'days');
    return startOfWeek.isSame(date, 'month') || endOfWeek.isSame(date, 'month');
};

/** Компонент "Месяц" для календаря. */
export class Month extends React.PureComponent<ICalendarMonthProps> {
    public render(): JSX.Element {
        const {pickedDate} = this.props;
        const date = pickedDate || moment();
        const locale = date.locale();

        return (
            <table className="cssClass[calendarMonthTable]">
                <thead>
                    <DaysOfWeek locale={locale} key="days-of-week" />
                </thead>
                <tbody>{this.renderWeeks()}</tbody>
            </table>
        );
    }

    /*
     * Отрисовка недель.
     */
    private renderWeeks = (): JSX.Element[] => {
        const {
            viewDate,
            pickedDate,
            limitRange,
            markedDays,
            disabledDays,
            pickedRange,
            onClick,
            onPickNextMonth,
            onPickPreviousMonth,
            dayHtmlAttributes,
        } = this.props;

        const currentMonth = viewDate
            .clone()
            .startOf('month')
            .startOf('week');

        return WEEKS_SET.map((offset) => currentMonth.clone().add(offset, 'week'))
            .filter((startOfWeek) => isWeekInMonth(viewDate, startOfWeek))
            .map((item, i) => (
                <Week
                    key={`${item.toString()}-${i}`}
                    pickedDate={pickedDate}
                    limitRange={limitRange}
                    markedDays={markedDays}
                    disabledDays={disabledDays}
                    creatingDate={item}
                    viewDate={viewDate.clone()}
                    onClick={onClick}
                    pickedRange={pickedRange}
                    onPickNextMonth={onPickNextMonth}
                    onPickPreviousMonth={onPickPreviousMonth}
                    dayHtmlAttributes={dayHtmlAttributes}
                />
            ));
    };
}
