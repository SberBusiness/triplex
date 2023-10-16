import {dateFormatYYYYMMDD, DAYS_SET, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {TDayHtmlAttributes, TPickedRange} from '@sberbusiness/triplex/components/Calendar/types';
import {Day} from '@sberbusiness/triplex/components/Calendar/components/Day';
import moment, {Moment} from 'moment';
import React from 'react';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства CalendarWeek. */
export interface ICalendarWeekProps {
    /** День, доступный для фокусировки в текущий момент при навигации с клавиатуры. Элемент с этой датой имеет tabIndex=0, остальные даты -1. */
    availableToFocusDay?: Moment;
    /** День, находящийся в фокусе в текущий момент при навигации с клавиатуры. */
    focusedDay?: Moment;
    /** Обработчик изменения focusedDay.  */
    onChangeFocusedDay?: (focusedDay?: Moment) => void;
    /** Выбранная дата. */
    pickedDate: TPickedDate;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: string[];
    /** Отключённые дни. */
    disabledDays?: string[];
    /** Дата для создания недели. */
    creatingDate: Moment;
    /** Дата является курсором, для навигации по интерфейсу. */
    viewDate: Moment;
    /** Обработчик клика. */
    onClick(date: Moment): void;
    /** Обработчик нажатия на дни следующего месяца. */
    onPickNextMonth(): void;
    /** Обработчик нажатия на дни предыдущего месяца. */
    onPickPreviousMonth(): void;
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** Отображаемый период. */
    pickedRange?: TPickedRange;
}

/** Компонент "Неделя" для календаря. */
export class Week extends React.Component<ICalendarWeekProps> {
    public static defaultProps = {
        limitRange: globalLimitRange,
    };

    public render(): JSX.Element {
        return <tr className="cssClass[calendarWeekRow]">{this.renderDays()}</tr>;
    }

    /**
     * Проверка принадлежности дня к разрешённому периоду.
     * @param {Moment} date Проверяемая дата.
     */
    private checkDateLimit = (date: Moment): boolean => {
        const {limitRange} = this.props;

        return Boolean(
            (limitRange && limitRange.dateFrom && date.isBefore(limitRange.dateFrom) && !date.isSame(limitRange.dateFrom, 'day')) ||
                (limitRange && limitRange.dateTo && date.isAfter(limitRange.dateTo) && !date.isSame(limitRange.dateTo, 'day'))
        );
    };

    /**
     * Проверяет, входит ли день в выбранный период.
     * @param {Moment} date Проверяемая дата.
     */
    private checkActive = (date: Moment): boolean => {
        const {pickedDate, pickedRange} = this.props;
        if (pickedRange) {
            return !!(pickedRange[0]?.isSame(date, 'day') || pickedRange[1]?.isSame(date, 'day'));
        } else {
            return !!pickedDate && date.isSame(pickedDate, 'day');
        }
    };

    /**
     * Проверяет, является ли дата отмеченной.
     * @param {Moment} date Проверяемая дата.
     */
    private checkMarked = (date: Moment): boolean => {
        const {markedDays} = this.props;
        return Boolean(markedDays?.includes(date.format(dateFormatYYYYMMDD)));
    };

    /**
     * Проверяет, является ли день левой границей выбранного периода.
     * @param {Moment} date Проверяемая дата.
     */
    private checkLeftBorder = (date: Moment): boolean => {
        const {pickedRange} = this.props;
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }
        return pickedRange[0].isSame(date, 'day');
    };

    /**
     * Проверяет, является ли день правой границей периода.
     * @param {Moment} date Проверяемая дата.
     */
    private checkRightBorder = (date: Moment): boolean => {
        const {pickedRange} = this.props;
        if (pickedRange && pickedRange[1]) {
            return date.isSame(pickedRange[1], 'day');
        } else {
            return false;
        }
    };

    /**
     * Проверяет, входит ли день в выбранный период.
     * @param {Moment} date Проверяемая дата.
     */
    private checkRange = (date: Moment): boolean => {
        const {pickedRange} = this.props;
        if (!pickedRange || !pickedRange[0] || !pickedRange[1]) {
            return false;
        }
        return date.isBetween(pickedRange[0], pickedRange[1]);
    };

    /**
     * Проверяет, является ли дата отключённой.
     * @param {Moment} date Проверяемая дата.
     */
    private checkDisabled = (date: Moment): boolean => {
        const {disabledDays} = this.props;
        return Boolean(disabledDays?.includes(date.format(dateFormatYYYYMMDD)));
    };

    /**
     * Проверяет, является ли день сегодняшним.
     * @param {Moment} date Проверяемая дата.
     */
    private checkCurrent = (date: Moment): boolean => date.isSame(moment(), 'day');

    /** Отрисовка дней недели. */
    private renderDays = (): JSX.Element[] => {
        const {availableToFocusDay, focusedDay, creatingDate, viewDate, dayHtmlAttributes} = this.props;
        const currentWeek = creatingDate.clone().startOf('week');

        return DAYS_SET.map((offset, i) => {
            const day: Moment = currentWeek.clone().add(offset, 'days');
            const isMuted = !day.isSame(viewDate, 'month');
            const isMarked = this.checkMarked(day);

            const dayAttributes = typeof dayHtmlAttributes === 'function' ? dayHtmlAttributes({isMarked}) : dayHtmlAttributes;
            const disabled = this.checkDateLimit(day) || this.checkDisabled(day);
            const focused = focusedDay && day.isSame(focusedDay, 'day');
            const availableToFocus = availableToFocusDay && day.isSame(availableToFocusDay, 'day');

            return (
                <Day
                    {...dayAttributes}
                    key={`${offset}-${i}`}
                    dayNumber={day.date()}
                    active={this.checkActive(day)}
                    marked={isMarked}
                    muted={isMuted}
                    focused={focused}
                    disabled={disabled}
                    isLeftBorder={this.checkLeftBorder(day) && !this.checkRightBorder(day)}
                    isRightBorder={this.checkRightBorder(day) && !this.checkLeftBorder(day)}
                    inRange={this.checkRange(day)}
                    isCurrentDate={this.checkCurrent(day)}
                    onClick={this.handleClick.bind(this, day)}
                    onFocus={this.handleFocus.bind(this, day)}
                    onKeyDown={focused ? this.handleKeyDownDay.bind(this, day) : undefined}
                    tabIndex={availableToFocus ? 0 : -1}
                />
            );
        });
    };

    private handleFocus = (day: Moment) => {
        const {onChangeFocusedDay} = this.props;
        onChangeFocusedDay?.(day);
    };

    /** Обработчик ввода с клавиатуры. Перемещает фокус на другой день или выбирает текущий. */
    private handleKeyDownDay = (day: Moment, event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const {onChangeFocusedDay} = this.props;
        const {key} = event;
        let nextFocusedDay;
        let nextSelectedDate;

        if (isKey(key, 'ARROW_UP')) {
            nextFocusedDay = day.add(-1, 'week');
            // Предотвращение скролла страницы.
            event.preventDefault();
        } else if (isKey(key, 'ARROW_LEFT')) {
            nextFocusedDay = day.add(-1, 'day');
        } else if (isKey(key, 'ARROW_RIGHT')) {
            nextFocusedDay = day.add(1, 'day');
        } else if (isKey(key, 'ARROW_DOWN')) {
            // Предотвращение скролла страницы.
            event.preventDefault();
            nextFocusedDay = day.add(1, 'week');
        } else if (isKey(key, 'ENTER')) {
            nextSelectedDate = day;
        }

        if (nextFocusedDay) {
            onChangeFocusedDay?.(nextFocusedDay);
        }

        if (nextSelectedDate) {
            this.props.onClick(nextSelectedDate);
        }
    };
    /**
     * Обработчик выбора дня.
     * @param {Moment} date Выбранная дата.
     */
    private handleClick = (date: Moment): void => {
        this.props.onClick(date);
    };
}
