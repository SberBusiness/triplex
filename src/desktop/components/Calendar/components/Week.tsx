import {dateFormatYYYYMMDD, DAYS_SET, globalLimitRange} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import {IDateLimitRange} from '@sberbusiness/triplex/desktop/common/types/DateTypes';
import {TDayHtmlAttributes, TPickedRange} from '@sberbusiness/triplex/desktop/components/Calendar/types';
import {Day} from '@sberbusiness/triplex/desktop/components/Calendar/components/Day';
import moment, {Moment} from 'moment';
import * as React from 'react';
import {TPickedDate} from '@sberbusiness/triplex/desktop/components/Calendar/types';

/**
 * @prop pickedDate Выбранная дата.
 * @prop [limitRange] Ограничение выбираемого периода.
 * @prop [markedDays] Отмеченные дни.
 * @prop [disabledDays] Отключённые дни.
 * @prop creatingDate Дата для создания недели.
 * @prop viewDate Дата является курсором, для навигации по интерфейсу.
 * @prop onClick Обработчик клика.
 * @prop onPickNextMonth Обработчик нажатия на дни следующего месяца.
 * @prop onPickPreviousMonth Обработчик нажатия на дни предыдущего месяца.
 * @prop [dayHtmlAttributes] HTML атрибуты компонента дня.
 * @prop [pickedRange] Отображаемый период.
 */
export interface ICalendarWeekProps {
    pickedDate: TPickedDate;
    limitRange?: IDateLimitRange;
    markedDays?: string[];
    disabledDays?: string[];
    creatingDate: Moment;
    viewDate: Moment;
    onClick(date: Moment): void;
    onPickNextMonth(): void;
    onPickPreviousMonth(): void;
    dayHtmlAttributes?: TDayHtmlAttributes;
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
        const {creatingDate, viewDate, dayHtmlAttributes} = this.props;
        const currentWeek = creatingDate.clone().startOf('week');

        return DAYS_SET.map((offset, i) => {
            const day: Moment = currentWeek.clone().add(offset, 'days');
            const isMuted = !day.isSame(viewDate, 'month');
            const isMarked = this.checkMarked(day);

            const dayAttributes = typeof dayHtmlAttributes === 'function' ? dayHtmlAttributes({isMarked}) : dayHtmlAttributes;

            return (
                <Day
                    {...dayAttributes}
                    key={`${offset}-${i}`}
                    dayNumber={day.date()}
                    active={this.checkActive(day)}
                    marked={isMarked}
                    muted={isMuted}
                    disabled={this.checkDateLimit(day) || this.checkDisabled(day)}
                    isLeftBorder={this.checkLeftBorder(day) && !this.checkRightBorder(day)}
                    isRightBorder={this.checkRightBorder(day) && !this.checkLeftBorder(day)}
                    inRange={this.checkRange(day)}
                    isCurrentDate={this.checkCurrent(day)}
                    onClick={this.handleClick.bind(null, day)}
                />
            );
        });
    };

    /**
     * Обработчик выбора дня.
     * @param {Moment} date Выбранная дата.
     */
    private handleClick = (date: Moment): void => {
        this.props.onClick(date);
    };
}
