import {WEEKS_SET} from '@sberbusiness/triplex/consts/DateConst';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {TDayHtmlAttributes, TPickedRange} from '@sberbusiness/triplex/components/Calendar/types';
import {DaysOfWeek} from '@sberbusiness/triplex/components/Calendar/components/DaysOfWeek';
import {Week} from '@sberbusiness/triplex/components/Calendar/components/Week';
import moment, {Moment} from 'moment';
import React from 'react';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';

/** Свойства CalendarMonth. */
export interface ICalendarMonthProps {
    /** День, доступный для фокусировки в текущий момент при навигации с клавиатуры. Элемент с этой датой имеет tabIndex=0, остальные даты -1. */
    availableToFocusDay?: Moment;
    /** День, находящийся в фокусе в текущий момент при навигации с клавиатуры. */
    focusedDay?: Moment;
    /** Обработчик изменения focusedDay.  */
    onChangeFocusedDay?: (focusedDay?: Moment) => void;
    /** Id для связи календаря и наименования текущего периода. Нужно для accessibility. */
    periodId?: string;
    /** Дата является курсором, для навигации по интерфейсу. */
    viewDate: Moment;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключённые дни. */
    disabledDays?: string[];
    /** Выбранная дата. */
    pickedDate: TPickedDate;
    /** Обработчик выбора даты. */
    onClick(date: Moment): void;
    /** Обработчик выбора следующего месяца. */
    onPickNextMonth(): void;
    /** Обработчик выбора предыдущего месяца. */
    onPickPreviousMonth(): void;
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** Отображаемый период. */
    pickedRange?: TPickedRange;
}

/** Компонент "Месяц" для календаря. */
export class Month extends React.PureComponent<ICalendarMonthProps> {
    public render(): JSX.Element {
        const {periodId, pickedDate} = this.props;
        const date = pickedDate || moment();
        const locale = date.locale();

        return (
            <table className="cssClass[calendarMonthTable]" role="grid" aria-labelledby={periodId}>
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
            availableToFocusDay,
            focusedDay,
            onChangeFocusedDay,
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

        const currentMonth = viewDate.clone().startOf('month').startOf('week');

        return WEEKS_SET.map((offset) => currentMonth.clone().add(offset, 'week')).map((item, i) => (
            <Week
                key={`${item.toString()}-${i}`}
                availableToFocusDay={availableToFocusDay}
                focusedDay={focusedDay}
                onChangeFocusedDay={onChangeFocusedDay}
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
