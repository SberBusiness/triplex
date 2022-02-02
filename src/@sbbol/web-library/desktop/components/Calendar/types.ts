import {ICalendarRangeProps} from '@sbbol/web-library/desktop/components/Calendar/Calendar';
import {IButtonIconProps} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {ILinkTextProps} from '../Link/Link';
import {Moment} from 'moment';
import React from 'react';

/** Внешний тип даты, который можно передать в компонент через свойства компонента. */
export type TPickedDateProp = string | Moment | null;

/** Приведенный к Moment тип даты, используемый для внутренних вычислений. */
export type TPickedDate = Moment | null;

/** Внешний тип периода, который можно передать в компонент через свойства компонента. */
export type TPickedRangeProp = [TPickedDateProp, TPickedDateProp];

/** Приведенный к Moment тип периода  для внутренних вычислений. */
export type TPickedRange = [TPickedDate, TPickedDate];

export interface ICalendarNestedProps {
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
    /** HTML атрибуты компонента месяца. */
    monthHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
    /** HTML атрибуты компонента года. */
    yearHtmlAttributes?: React.HTMLAttributes<HTMLDivElement>;
    /** Пропсы кнопки переключения на предыдущую страницу (месяца, года, десятилетия). */
    prevButtonProps?: IButtonIconProps;
    /** Пропсы кнопки переключения на следующую страницу (месяца, года, десятилетия). */
    nextButtonProps?: IButtonIconProps;
    /** Пропсы ссылки для смены вида календаря (месяц, год, десятилетие). */
    changeViewLinkProps?: Omit<ILinkTextProps, 'linkType' | 'size'>;
}

/** Свойства Calendar, передаваемые в рендер-функцию CalendarRange. */
export interface ICalendarProvideProps extends ICalendarRangeProps {}
