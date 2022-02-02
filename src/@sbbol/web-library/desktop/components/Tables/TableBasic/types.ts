/* eslint-disable @typescript-eslint/no-explicit-any */
import {EScreenSize} from '@sbbol/web-library/common/enums/EScreenSize';
import {ECellType, EHorizontalAlign, EVerticalAlign, EOrderDirection} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import {TAriaHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/AriaAttributes';
import {TDataHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/DataAttributes';

/**
 * Интерфейс колонки.
 * @prop {string} fieldKey По какому столбцу производить сортировку.
 * @prop {string | JSX.Element} [label] Контент заголовка столбца.
 * @prop {string} [title] Заголовок столбца при наводе указателя.
 * @prop {EOrderDirection} [orderDirection] Порядок сортировки.
 * @prop {EHorizontalAlign} [horizontalAlign] Горизонтальное выравнивание.
 * @prop {EVerticalAlign} [verticalAlign] Вертикальное выравнивание.
 * @prop {ECellType} [cellType] Тип ячейки.
 * @prop {React.ReactText} [width] Ширина колонки (включая боковые внутренние отступы), пример значений 10|'10%'.
 * @prop {EScreenSize[]} [hideScreenSizes] Список ширин экрана, когда столбец не виден.
 * @prop {Function} [renderCell] Функция рендера ячейки.
 * @prop {TAriaAttributes} [ariaAttributes] Aria-атрибуты.
 * @prop {TDataAttributes} [dataAttributes] Data-атрибуты.
 */
export interface ITableBasicColumn {
    fieldKey: string;
    label?: string | JSX.Element;
    title?: string;
    orderDirection?: EOrderDirection;
    horizontalAlign?: EHorizontalAlign;
    verticalAlign?: EVerticalAlign;
    cellType?: ECellType;
    width?: React.ReactText;
    hideScreenSizes?: EScreenSize[];
    renderCell?: (param: any) => React.ReactNode;
    dataAttributes?: TDataHTMLAttributes;
    ariaAttributes?: TAriaHTMLAttributes;
}

/**
 * Порядок сортировки.
 * @prop {string} fieldKey По какому столбцу производить сортировку.
 * @prop {EOrderDirection} direction Порядок сортировки.
 */
export interface ISortOrder {
    fieldKey: string;
    direction: EOrderDirection;
}

/**
 * Интерфейс данных для строки.
 * @prop {string} rowKey Идентификатор сортировки.
 * @prop {any} rowData Данные строки в виде объекта. // Todo пока нет архитектурного понимания о его структуре/типизации.
 * @prop {boolean} [selected] Выбрана ли строка для массового действия.
 * @prop {TAriaAttributes} [ariaAttributes] Aria-атрибуты.
 * @prop {TDataAttributes} [dataAttributes] Data-атрибуты.
 */
export interface ITableBasicRow {
    rowKey: string;
    rowData: any;
    selected?: boolean;
    dataAttributes?: TDataHTMLAttributes;
    ariaAttributes?: TAriaHTMLAttributes;
}
