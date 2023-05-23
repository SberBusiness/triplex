import * as React from 'react';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {TDataHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/DataAttributes';
import {EInputGroupPosition} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';
import {RefObject} from 'react';

/**
 * Функция установки рефа, generic.
 * @param instance Инстанс HTML элемента, для которого устанавливается реф.
 */
export type TSetRef<T> = (instance: T) => void;

/**
 * Публичный интерфейс компонента SuggestCustom.
 */
export interface ISuggestCustomProps<T>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSelect' | 'className' | 'style'>,
        TestProps {
    // @prop {boolean} [error] Флаг для отображения красной обводки (ошибка валидации).
    error?: boolean;
    // @prop {boolean} [notFound] Флаг для отображения тултипа при отсутствии значений для выпадающего списка.
    // @deprecated используйте prop isTooltipOpened в связке с tooltipHint.
    notFound?: boolean;
    // @prop {boolean} [loading] Флаг для отображения лоадера.
    loading?: boolean;
    // @prop {boolean} [disabled] Флаг для отображения в состоянии disabled.
    disabled?: boolean;
    // @prop {boolean} [showListSpinner] Флаг для отображения спиннера в списке опций (для догрузки данных).
    showListSpinner?: boolean;
    // @prop {boolean} [saveFilterOnFocus] Флаг для изменения поведения при клике на компонент с заполненным value (true - сохранит введённую строку фильтра).
    saveFilterOnFocus?: boolean;
    // @prop {string} [filterValue] Строка фильтра @deprecated.
    filterValue?: string;
    // @prop {string} [placeholder] Плейсхолдер.
    placeholder?: string;
    // @prop {EInputGroupPosition} [groupPosition] Позиция внутри компонента InputGroup.
    groupPosition?: EInputGroupPosition;
    // @prop {T} value Выбранное значение.
    value: T;
    // @prop {T[]} options Список значений.
    options: T[];
    // @prop {() => void} [onFocus] Обработчик установки фокуса.
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    // @prop {(filterString: string) => void} onFilter Обработчик фильтрации значений.
    onFilter: (filterString: string) => void;
    // @prop {(item: T, e?: Event) => void} onSelect Обработчик выбора элемента из списка.
    onSelect: (item: T, e?: Event) => void;
    // @prop {() => void} [onScrollEnd] Обработчик окончания скролла списка (доступные в данный момент элементы закончились).
    onScrollEnd?: () => void;
    // @prop {TSetRef<HTMLElement | null>} [setRef] Установка ссылки на обёртку для манипуляции с ней снаружи.
    setRef?: TSetRef<HTMLElement | null>;
    // @prop {string} tooltipHint Текст подсказки.
    tooltipHint: string;
    // @prop {boolean} isTooltipOpened Флаг открытия тултипа.
    isTooltipOpened: boolean;
    // @prop {Function} [renderDropdown] Рендер выпадающего списка.
    renderDropdown?: (dropdownProps: ISuggestDropdownProps<T>) => JSX.Element;
    // @prop {RefObject<HTMLElement | null>} [dropdownRef] Реф на кастомную отрисовку дропдауна(для корректного определения клика снаружи).
    dropdownRef?: RefObject<HTMLElement | null>;
    // @prop {Function} [renderDropdownItem] Рендер элемента выпадающего списка.
    renderDropdownItem?: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    // @prop {Function} [renderDropdownItemLabel] Рендер лейбла элемента выпабающего списка.
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    // @prop {Function} [renderTargetInput] Рендер инпута.
    renderTargetInput?: (targetInputProps: ISuggestTargetProps<T>) => JSX.Element;
    // @prop {Function} [renderTargetLabel] Рендер лейбла.
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
    /** @deprecated Используйте prop renderDropdownItemLabel компонента SuggestCustom */
    labelReactNode?: React.ReactNode;
}

/** Интерфейс свойств SuggestTarget. */
export interface ISuggestTargetProps<T>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onSelect' | 'onFocus' | 'onClick'> {
    // @prop {boolean} [loading] Флаг состояния загрузки данных.
    loading?: boolean;
    // @prop {boolean} focused Флаг состояния фокуса.
    focused: boolean;
    // @prop {boolean} opened Флаг состояния открыт/закрыт.
    opened: boolean;
    // @prop {string} [className] CSS класс. @default undefined.
    className?: string;
    // @prop {string} query Поисковая строка. @default ''.
    query: string;
    // @prop {string} query Поисковая строка. @default ''.
    value: T;
    // @prop {string} [dataTestId] Идентификатор для тестирования.
    dataTestId?: string;
    // @prop {number} optionsLength Количество опций. @default 0.
    optionsLength: number;
    // @prop {TSetRef<HTMLInputElement | null>} setRef Функция установки ссылки на DOM-элемент input.
    setRef: TSetRef<HTMLInputElement | null>;
    // @prop {Function} onFocus Обработчик фокуса компонента.
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    // @prop {Function} onClick Обработчик клика по компоненту.
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    // @prop {Function} [renderTargetInput] Рендер инпута.
    renderTargetInput?: (targetInputProps: ISuggestTargetProps<T>) => JSX.Element;
    // @prop {Function} [renderTargetLabel] Рендер заглушки с выбранным значением.
    renderTargetLabel?: (targetLabelProps: ISuggestTargetProps<T>) => JSX.Element;
}

/** Интерфейс свойств SuggestDropdown. */
export interface ISuggestDropdownProps<T> {
    // @prop {boolean} opened Флаг состояния выпадающего списка.
    opened: boolean;
    // @prop {boolean} [showListSpinner] Флаг состояния лоадера дозагрузки опций.
    showListSpinner?: boolean;
    // @prop {T[]} options Список опций.
    options: T[];
    // @prop {string} [className] CSS класс.
    className?: string;
    // @prop {string} [className] CSS класс спиннера.
    spinnerClassName?: string;
    // @prop {string} [dataTestId] Идентификатор для тестирования.
    dataTestId?: string;
    // @prop {string} [instanceId] Идентификатор инстанса компонента.
    instanceId: string;
    // @prop T selected Выбранный элемент.
    selected: T;
    // @prop {Function} [renderDropdownItem] Рендер-функция для отображения элемента списка.
    renderCustom?: (itemProps: ISuggestDropdownProps<T>) => JSX.Element;
    // @prop {Function} [renderDropdownItem] Рендер-функция для отображения элемента списка.
    renderDropdownItem?: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    // @prop {Function} [renderDropdownItemLabel] Рендер-функция для отображения лейбла элемента списка.
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    // @prop {React.RefObject} Ссылка на DOM элемент списка.
    listRef?: React.RefObject<HTMLDivElement>;
    // @prop {Function} onSelect Обработчик выбора элемента.
    onSelect: (option: T) => void;
}

/** Интерфейс свойств SuggestDropdownItem. */
export interface ISuggestDropdownItemProps<T> extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    // @prop {T} option Объект опции.
    option: T;
    // @prop {boolean} selected Флаг состояния элемента (выбран/невыбран).
    selected: boolean;
    // @prop {boolean} [active] Флаг состояния активности элемента (активным элемент становится при перемещении на него курсора).
    active?: boolean;
    // @prop {string} key Ключ реакт элемента.
    key: string;
    // @prop {string} [dataTestId] Идентификатор для тестирования.
    dataTestId?: string;
    // @prop {Function} [renderCustom] Рендер-функция для отображения кастомного элемента списка.
    renderCustom?: (itemProps: ISuggestDropdownItemProps<T>) => JSX.Element;
    // @prop {Function} [renderDropdownItemLabel] Рендер-функция для отображения лейбла элемента списка.
    renderDropdownItemLabel?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
    // @prop {Function} [onMouseOver] Обработчик события наведения курсора мыши на элемент списка.
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    // @prop {Function} onSelect Обработчик выбора элемента.
    onSelect: (option: T) => void;
}

/** Интерфейс свойств SuggestDropdownItemLabel. */
export interface ISuggestDropdownItemLabelProps<T> {
    // @prop {T} option Объект опции.
    option: T;
    // @prop {Function} [renderCustom] Рендер-функция для отображения элемента списка.
    renderCustom?: (labelProps: ISuggestDropdownItemLabelProps<T>) => JSX.Element;
}
