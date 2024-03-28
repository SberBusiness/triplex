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
} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TOrderedChildren} from '@sberbusiness/triplex/utils/reactChildDeprecated';

/** Интерфейс координат X. */
export interface ITooltipXCoordinates {
    /** Начало координат Х. */
    start: ETooltipStartCoordinates.X;
    /** Конец координат Х. */
    end: ETooltipEndCoordinates.X;
    /** Тип параметра размера (для X - ширина). */
    size: ETooltipSizeParameter.W;
}

/** Интерфейс координат Y. */
export interface ITooltipYCoordinates {
    /** Начало координат Y. */
    start: ETooltipStartCoordinates.Y;
    /** Конец координат Y. */
    end: ETooltipEndCoordinates.Y;
    /** Тип параметра размера (для y - высота). */
    size: ETooltipSizeParameter.H;
}

/** Интерфейс оси ряд. */
export interface ITooltipRow {
    /** Главная ось. */
    [ETooltipAxesType.MAIN]: TTooltipAxesCoordinates;
    /** Вспомогательная/поперечная/перекрестная ось. */
    [ETooltipAxesType.CROSS]: TTooltipAxesCoordinates;
}
/** Интерфейс оси столбец. */
export interface ITooltipColumn extends ITooltipRow {}

/** Интерфейс координат для разного потока flex. */
export interface ITooltipAxes {
    [ETooltipFlowTypes.ROW]: ITooltipRow;
    [ETooltipFlowTypes.COLUMN]: ITooltipColumn;
}

/** Интерфейс координат. */
interface ITooltipCoordinates {
    [ETooltipStartCoordinates.X]: number;
    [ETooltipEndCoordinates.X]: number;
    [ETooltipStartCoordinates.Y]: number;
    [ETooltipEndCoordinates.Y]: number;
}

/** Интерфейс размеров. */
export interface ITooltipSize {
    [ETooltipSizeParameter.H]: number;
    [ETooltipSizeParameter.W]: number;
}

/** Интерфейс границ. */
export interface ITooltipBounds extends ITooltipSize, ITooltipCoordinates {}

/** Интерфейс длин осей. */
interface ITooltipAxesLength {
    /** Длина вспомогательной/поперечной/перекрестной оси. */
    crossLength: number;
    /** Длина основной оси. */
    mainLength: number;
}

/** Интерфейс границ без размеров. */
export interface ITooltipRelPosition extends ITooltipAxesLength, ITooltipCoordinates {}

/** Интерфейс занимаемой области с параметрами позиционирования. */
export interface ITooltipDomainSize extends ITooltipSize {
    [ETooltipTypeName.FLOW]: ETooltipFlowTypes;
    [ETooltipTypeName.STANDING]: ETooltipPreferPlace;
    [ETooltipTypeName.SIDE]: ETooltipAlign;
    /** Количество зон, которые будут обрезаны при открытии нового попапа (вроде как зон - других попапов).*/
    cutOff?: number;
    /** Порядок для позиционирования во flex. */
    order: number;
}

/** Тип осей координат с типом размерности. */
export type TTooltipAxesCoordinates = ITooltipXCoordinates | ITooltipYCoordinates;

/** Тип взаимодействия с тултипом. */
export type TTooltipToggleType = 'click' | 'hover';

/** Свойства компонента Tooltip. */
export interface ITooltipProps extends Omit<ITooltipBaseProps, 'setTooltipRef' | 'closeTooltip'> {
    /** Тултип должен появлятся по ховеру или по клику. */
    toggleType?: TTooltipToggleType;
    /** Добавление обработчиков фокуса и потери фокуса. Закрытие и открытие тултипа по табу (для screen reader). По умолчанию включен. */
    tabSensitive?: boolean;
    /** Контролирующая функция закрытия/открытия. */
    toggle?: (nextExpanded: boolean) => void;
}

/** Базовые свойства компонента Tooltip. */
export interface ITooltipBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    /** Признак открыт ли Tooltip. */
    isOpen?: boolean;
    /** Получение ноды тултипа. */
    setTooltipRef?: (tooltipElement: HTMLDivElement) => void;
    /** Обработчик закрытия тултипа по нажатию на крестик. */
    closeTooltip?: () => void;
    /** Обработчик открытия тултипа, tooltip - реф на тултип. */
    onShow?: (tooltip: HTMLDivElement) => void;
    /** Предпочитаемое место расположения тултипа, если в этом месте тултип не помещается, он отобразится там где помещается. */
    preferPlace?: ETooltipPreferPlace;
    /** Расположение указателя. */
    alignTip?: ETooltipAlign;
    /** Размер тултипа. */
    size: ETooltipSize;
    /** Элемент в который будет рендерится тултип. */
    tooltipRenderContainer?: Element;
}

/** Базовые состояния компонента Tooltip. */
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
