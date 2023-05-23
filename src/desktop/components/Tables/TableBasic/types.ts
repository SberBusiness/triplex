/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {
    ECellType,
    EHorizontalAlign,
    EVerticalAlign,
    EOrderDirection,
} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {TAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';
import {TDataHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/DataAttributes';

/** Интерфейс колонки. */
export interface ITableBasicColumn {
    /** По какому столбцу производить сортировку. */
    fieldKey: string;
    /** Контент заголовка столбца. */
    label?: string | JSX.Element;
    /** Заголовок столбца при наводе указателя. */
    title?: string;
    /** Порядок сортировки. */
    orderDirection?: EOrderDirection;
    /** Горизонтальное выравнивание. */
    horizontalAlign?: EHorizontalAlign;
    /** Вертикальное выравнивание. */
    verticalAlign?: EVerticalAlign;
    /** Тип ячейки. */
    cellType?: ECellType;
    /** Ширина колонки (включая боковые внутренние отступы), пример значений 10|'10%'. */
    width?: React.ReactText;
    /** Ширина экрана, когда столбец не виден. */
    hideScreenWidth?: EScreenWidth;
    /** Функция рендера ячейки. */
    renderCell?: (param: any) => React.ReactNode;
    /** Data-атрибуты. */
    dataAttributes?: TDataHTMLAttributes;
    /** Aria-атрибуты. */
    ariaAttributes?: TAriaHTMLAttributes;
}

/** Порядок сортировки. */
export interface ISortOrder {
    /** По какому столбцу производить сортировку. */
    fieldKey: string;
    /** Направление сортировки. */
    direction: EOrderDirection;
}

/** Свойства объединенной ячейки в строке. */
export interface ITableRowCellSpanProps {
    /** Число ячеек для объединения по вертикали. */
    rowSpan?: number;
    /** Число ячеек для объединения по горизонтали. */
    colSpan?: number;
}

/** Интерфейс данных для строки. */
export interface ITableBasicRow {
    /** Идентификатор сортировки. */
    rowKey: string;
    /** Данные строки в виде объекта. */
    rowData: any; // Todo пока нет архитектурного понимания о его структуре/типизации.
    /** Информация об объединенных ячейках в виде объекта. */
    rowLayout?: Record<string, ITableRowCellSpanProps>;
    /** Выбрана ли строка для массового действия. */
    selected?: boolean;
    /** Aria-атрибуты. */
    dataAttributes?: TDataHTMLAttributes;
    /** Data-атрибуты. */
    ariaAttributes?: TAriaHTMLAttributes;
}
