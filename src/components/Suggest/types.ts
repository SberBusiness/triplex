import React from 'react';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TDataHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/DataAttributes';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';

/**
 * Функция установки рефа, generic.
 * @param instance Инстанс HTML элемента, для которого устанавливается реф.
 */
export type TSetRef<T> = (instance: T) => void;

/** Свойства компонента SuggestCustom. */
export interface ISuggestCustomProps<T>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSelect' | 'className' | 'style'>,
        TestProps {
    /** Флаг для отображения красной обводки (ошибка валидации). */
    error?: boolean;
    /**
     * Флаг для отображения тултипа при отсутствии значений для выпадающего списка.
     * @deprecated Используйте свойство isTooltipOpened в связке с tooltipHint.
     */
    notFound?: boolean;
    /** Флаг для отображения лоадера. */
    loading?: boolean;
    /** Флаг для отображения в состоянии disabled. */
    disabled?: boolean;
    /** Флаг для отображения спиннера в списке опций (для догрузки данных). */
    showListSpinner?: boolean;
    /** Флаг для изменения поведения при клике на компонент с заполненным value (true - сохранит введённую строку фильтра). */
    saveFilterOnFocus?: boolean;
    /** Плейсхолдер. */
    placeholder?: string;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
    /** Выбранное значение. */
    value?: T;
    /** Список значений. */
    options: T[];
    /** Обработчик установки фокуса. */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик фильтрации значений. */
    onFilter: (filterString: string) => void;
    /** Обработчик выбора элемента из списка. */
    onSelect: (item?: T, e?: Event) => void;
    /** Обработчик окончания скролла списка (доступные в данный момент элементы закончились). */
    onScrollEnd?: () => void;
    /** Установка ссылки на обёртку для манипуляции с ней снаружи. */
    setRef?: TSetRef<HTMLElement | null>;
    /** Текст подсказки. */
    tooltipHint: string;
    /** Флаг открытия тултипа. */
    isTooltipOpened: boolean;
    /** Рендер выпадающего списка. */
    renderDropdown?: (dropdownProps: ISuggestDropdownProps<T>) => JSX.Element;
    /** Реф на кастомную отрисовку дропдауна(для корректного определения клика снаружи). */
    dropdownRef?: React.RefObject<HTMLElement | null>;
    /** Рендер элемента выпадающего списка. */
    renderDropdownItem?: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    /** Рендер лейбла элемента выпадающего списка. */
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    /** Рендер инпута. */
    renderTargetInput?: (targetInputProps: ISuggestTargetProps<T>) => JSX.Element;
    /** Рендер лейбла. */
    renderTargetLabel?: (targetLabelProps: ISuggestTargetProps<T>) => JSX.Element;
}

type TSuggestOmittedRenders =
    | 'renderDropdown'
    | 'renderDropdownItem'
    | 'renderDropdownItemLabel'
    | 'renderTargetInput'
    | 'renderTargetLabel';

export type TSuggestProps<T> = Omit<ISuggestCustomProps<T>, TSuggestOmittedRenders>;

/**
 * Свойствo labelReactNode позволяет форматировать вывод option.
 *
 * @prop {React.ReactNode} [labelReactNode] Option в формате ReactNode.
 */
export interface ISuggestOption {
    dataAttributes?: TDataHTMLAttributes;
    id?: string;
    label: string;
    value?: any;
    /** @deprecated Используйте свойство renderDropdownItemLabel компонента SuggestCustom. */
    labelReactNode?: React.ReactNode;
}

/** Свойство компонента SuggestTarget. */
export interface ISuggestTargetProps<T>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSelect' | 'onFocus' | 'onClick'> {
    /** Флаг состояния загрузки данных. */
    loading?: boolean;
    /** Флаг состояния фокуса. */
    focused: boolean;
    /** Флаг состояния открыт/закрыт. */
    opened: boolean;
    /** Флаг состояния ошибки. */
    error?: boolean;
    /** CSS класс. @default undefined. */
    className?: string;
    /** Поисковая строка. @default ''. */
    query: string;
    /** Поисковая строка. @default ''. */
    value?: T;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Количество опций. @default 0. */
    optionsLength: number;
    /** Функция установки ссылки на DOM-элемент input. */
    setRef: TSetRef<HTMLInputElement | null>;
    /** Обработчик фокуса компонента. */
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик клика по компоненту. */
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    /** Рендер поля ввода. */
    renderTargetInput?: (targetInputProps: ISuggestTargetProps<T>) => JSX.Element;
    /** Рендер заглушки с выбранным значением. */
    renderTargetLabel?: (targetLabelProps: ISuggestTargetProps<T>) => JSX.Element;
}

/** Свойство компонента SuggestDropdown. */
export interface ISuggestDropdownProps<T> {
    /** Флаг состояния выпадающего списка. */
    opened: boolean;
    /** Флаг состояния лоадера дозагрузки опций. */
    showListSpinner?: boolean;
    /** Список опций. */
    options: T[];
    /** CSS класс. */
    className?: string;
    /** CSS класс спиннера. */
    spinnerClassName?: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Идентификатор инстанса компонента. */
    instanceId: string;
    /** Выбранный элемент. */
    selected?: T;
    /** Рендер-функция для отображения элемента списка. */
    renderCustom?: (itemProps: ISuggestDropdownProps<T>) => JSX.Element;
    /** Рендер-функция для отображения элемента списка. */
    renderDropdownItem: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    /** Рендер-функция для отображения лейбла элемента списка. */
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    /** Ссылка на DOM элемент списка. */
    listRef?: React.RefObject<HTMLDivElement>;
    /** Ссылка на DOM элемент suggest. */
    suggestRef: React.RefObject<HTMLInputElement>;
    /** Обработчик выбора элемента. */
    onSelect: (option: T) => void;
    /** Обработчик открытия выпадающего списка. */
    setOpened: (opened: boolean) => void;
    /** Css класс для выпадающего списка. */
    suggestDropdownListClassName: string;
    /** Css класс для элемента выпадающего списка. */
    suggestDropdownItemClassName: string;
}

/** Свойства компонента SuggestDropdownItem. */
export interface ISuggestDropdownItemProps<T> extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /** Объект опции. */
    option: T;
    /** Флаг состояния элемента (выбран/невыбран). */
    selected: boolean;
    /** Флаг состояния активности элемента (активным элемент становится при перемещении на него курсора). */
    active?: boolean;
    /** Ключ реакт элемента. */
    key: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Рендер-функция для отображения кастомного элемента списка. */
    renderCustom?: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    /** Рендер-функция для отображения лейбла элемента списка. */
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    /** Обработчик события наведения курсора мыши на элемент списка. */
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /** Обработчик выбора элемента. */
    onSelect: (option: T) => void;
}

/** Свойства компонента SuggestDropdownItemLabel. */
export interface ISuggestDropdownItemLabelProps<T> {
    /** Объект опции. */
    option: T;
    /** Рендер-функция для отображения элемента списка. */
    renderCustom?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
}
