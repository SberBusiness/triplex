import React from 'react';
import {
    ETooltipAlign,
    ETooltipAxesType,
    ETooltipEndCoordinates,
    ETooltipFlowTypes,
    ETooltipPreferPlace,
    ETooltipSizeParameter,
    ETooltipStartCoordinates,
    ETooltipSize,
    ETooltipTypeName,
} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {TOrderedChildren} from '@sberbusiness/triplex/desktop/utils/reactChildDeprecated';

/**
 * Интерфейс координат x.
 *
 * @prop {ETooltipStartCoordinates.X} start Начало координат Х.
 * @prop {ETooltipEndCoordinates.X} end Конец координат Х.
 * @prop {ETooltipSizeParameter.W} size Тип параметра размера (для х - ширина).
 */
export interface ITooltipXCoordinates {
    start: ETooltipStartCoordinates.X;
    end: ETooltipEndCoordinates.X;
    size: ETooltipSizeParameter.W;
}

/**
 * Интерфейс координат y.
 *
 * @prop {ETooltipStartCoordinates.Y} start Начало координат Y.
 * @prop {ETooltipEndCoordinates.Y} end Конец координат Y.
 * @prop {ETooltipSizeParameter.H} size Тип параметра размера (для y - высота).
 */
export interface ITooltipYCoordinates {
    start: ETooltipStartCoordinates.Y;
    end: ETooltipEndCoordinates.Y;
    size: ETooltipSizeParameter.H;
}

/**
 * Интерфейс оси ряд.
 *
 * @prop {TTooltipAxesCoordinates} EAxesType.MAIN Главная ось.
 * @prop {TTooltipAxesCoordinates} EAxesType.CROSS Вспомогательная/поперечная/перекрестная ось.
 */
export interface ITooltipRow {
    [ETooltipAxesType.MAIN]: TTooltipAxesCoordinates;
    [ETooltipAxesType.CROSS]: TTooltipAxesCoordinates;
}
/**
 * Интерфейс оси столбец.
 */
// tslint:disable-next-line: no-empty-interface
export interface ITooltipColumn extends ITooltipRow {}

/**
 * Интерфейс координат для разного потока flex.
 */
export interface ITooltipAxes {
    [ETooltipFlowTypes.ROW]: ITooltipRow;
    [ETooltipFlowTypes.COLUMN]: ITooltipColumn;
}

/**
 * Интерфейс координат.
 */
interface ITooltipCoordinates {
    [ETooltipStartCoordinates.X]: number;
    [ETooltipEndCoordinates.X]: number;
    [ETooltipStartCoordinates.Y]: number;
    [ETooltipEndCoordinates.Y]: number;
}

/**
 * Интерфейс размеров.
 */
export interface ITooltipSize {
    [ETooltipSizeParameter.H]: number;
    [ETooltipSizeParameter.W]: number;
}

/**
 * Интерфейс границ.
 */
export interface ITooltipBounds extends ITooltipSize, ITooltipCoordinates {}

/**
 * Интерфейс длин осей.
 *
 * @prop {number} crossLength Длина вспомогательной/поперечной/перекрестной оси.
 * @prop {number} mainLength Длина основной оси.
 */
interface ITooltipAxesLength {
    crossLength: number;
    mainLength: number;
}

/**
 * Интерфейс границ без размеров.
 */
export interface ITooltipRelPosition extends ITooltipAxesLength, ITooltipCoordinates {}

/**
 * Интерфейс занимаемой области с параметрами позиционирования.
 *
 * @prop {number} [cutOff] Количество зон, которые будут обрезаны при открытии нового попапа (вроде как зон - других
 * попапов).
 * @prop {number} order Порядок для позиционирования во flex.
 */
export interface ITooltipDomainSize extends ITooltipSize {
    [ETooltipTypeName.FLOW]: ETooltipFlowTypes;
    [ETooltipTypeName.STANDING]: ETooltipPreferPlace;
    [ETooltipTypeName.SIDE]: ETooltipAlign;
    cutOff?: number;
    order: number;
}

/**
 * Тип осей координат с типом размерности.
 */
export type TTooltipAxesCoordinates = ITooltipXCoordinates | ITooltipYCoordinates;

/**
 * Тип взаимодействия с тултипом.
 */
export type TTooltipToggleType = 'click' | 'hover';

/**
 * @prop {'click' | 'hover'} [toggleType] Тултип должен появлятся по ховеру или по клику.
 * @prop {boolean} [tabSensitive] Добавление обработчиков фокуса и потери фокуса. Закрытие и открытие тултипа по табу (для screen reader). По умолчанию включен.
 * @prop {(nextExpanded: boolean) => void} [toggle] Контролирующая функция закрытия/открытия.
 */
export interface ITooltipProps extends Omit<ITooltipBaseProps, 'setTooltipRef' | 'closeTooltip'> {
    toggleType?: TTooltipToggleType;
    tabSensitive?: boolean;
    toggle?: (nextExpanded: boolean) => void;
}

export interface ITooltipBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    /** Признак открыт ли Tooltip. */
    isOpen?: boolean;
    /** Получение ноды тултипа. */
    setTooltipRef?: (tooltipElement: HTMLDivElement) => void;
    /** Обработчик закрытия тултипа по нажатию на крестик. */
    closeTooltip?: () => void;
    /** Обработчик который вызывается при открытии тултипа, tooltip - реф на тултип. */
    onShow?: (tooltip: HTMLDivElement) => void;
    /** Предпочитаемое место расположение тултипа, если в этом месте тултип не помещается, он отобразится там где помещается. */
    preferPlace?: ETooltipPreferPlace;
    /** Расположение указателя. */
    alignTip?: ETooltipAlign;
    /** Размер тултипа. */
    size: ETooltipSize;
    /** Элемент в который будет рендерится тултип. */
    tooltipRenderContainer?: Element;
}

export interface ITooltipBaseState {
    /** Отсортированный массив детей. */
    orderedChildren: TOrderedChildren;
    /** Для отслеживания того что анимация при закрытии тултипа в прогрессе. */
    exiting: boolean;
    /** Положение Tooltip'a. */
    standing: ETooltipPreferPlace;
    /** Открыт/закрыт ли tooltip. */
    opened: boolean;
    /** Нужно рендерить тултип или нет, признак анимационно зависимого рендериннга открыт/закрыт ли tooltip. */
    needRenderTooltip: boolean;
}
