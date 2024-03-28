import React from 'react';
import {Moment} from 'moment';
import {ICalendarRangeProps} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ILinkTextProps} from '../Link/Link';

/** Внешний тип даты, который можно передать в компонент через свойства компонента. */
export type TPickedDateProp = string | Moment | null;

/** Приведенный к Moment тип даты, используемый для внутренних вычислений. */
export type TPickedDate = Moment | null;

/** Внешний тип периода, который можно передать в компонент через свойства компонента. */
export type TPickedRangeProp = [TPickedDateProp, TPickedDateProp];

/** Приведенный к Moment тип периода для внутренних вычислений. */
export type TPickedRange = [TPickedDate, TPickedDate];

/**
 * Интерфейс параметров, которые можно передать в функцию для получения HTML атрибутов компонента дня,
 * если они участвуют в формировании значений атрибутов.
 */
export interface IDayHtmlAttributesFunctionParams {
    /** День является отмеченным. */
    marked: boolean;
}

/** Функция для получения HTML атрибутов компонента дня. */
export type TDayHtmlAttributesFunction = (params: IDayHtmlAttributesFunctionParams) => React.HTMLAttributes<HTMLTableCellElement>;

/** Alias для data атрибутов. */
type TDataAttributeAlias = `data-${string}`;

export type THTMLAttributesWithData = {
    [dataAttribute in TDataAttributeAlias]: string;
} & React.HTMLAttributes<HTMLTableCellElement>;

/** Тип HTML атрибутов компонента дня. */
export type TDayHtmlAttributes = THTMLAttributesWithData | TDayHtmlAttributesFunction;

export interface ICalendarNestedProps {
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** HTML атрибуты компонента месяца. */
    monthHtmlAttributes?: React.HTMLAttributes<HTMLTableCellElement>;
    /** HTML атрибуты компонента года. */
    yearHtmlAttributes?: React.HTMLAttributes<HTMLTableCellElement>;
    /** Пропсы кнопки переключения на предыдущую страницу. */
    prevButtonProps?: IButtonIconProps;
    /** Пропсы кнопки переключения на следующую страницу. */
    nextButtonProps?: IButtonIconProps;
    /** Пропсы ссылки для смены вида календаря. */
    changeViewLinkProps?: Omit<ILinkTextProps, 'linkType' | 'size'>;
}

/** Свойства Calendar, передаваемые в рендер-функцию CalendarRange. */
export interface ICalendarProvideProps extends ICalendarRangeProps {}
