import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {ECellType, EHorizontalAlign, EVerticalAlign} from '@sberbusiness/triplex/desktop/components/Tables/TableBasic/enums';
import {cssClass} from '@sberbusiness/triplex/desktop/utils/cssClass';

/**
 * Преобразование значения горизонтального выравнивания в css-класс.
 * @param {EHorizontalAlign} [horizontalAlign] Значение для маппинга.
 */
export const mapHorizontalAlignToClassName = (horizontalAlign: EHorizontalAlign = EHorizontalAlign.LEFT): string => {
    switch (horizontalAlign) {
        case EHorizontalAlign.LEFT:
            return 'cssClass[alignLeft]';
        case EHorizontalAlign.RIGHT:
            return 'cssClass[alignRight]';
        case EHorizontalAlign.CENTER:
            return 'cssClass[alignCenter]';
    }
};

/**
 * Преобразование значения вертикального выравнивания в css-класс.
 * @param {EVerticalAlign} [verticalAlign] Значение для маппинга.
 */
export const mapVerticalAlignToClassName = (verticalAlign: EVerticalAlign = EVerticalAlign.BASELINE): string => {
    switch (verticalAlign) {
        case EVerticalAlign.BASELINE:
            return 'cssClass[verticalAlignBaseline]';
        case EVerticalAlign.SUB:
            return 'cssClass[verticalAlignSub]';
        case EVerticalAlign.SUPER:
            return 'cssClass[verticalAlignSuper]';
        case EVerticalAlign.TEXT_TOP:
            return 'cssClass[verticalAlignTextTop]';
        case EVerticalAlign.TEXT_BOTTOM:
            return 'cssClass[verticalAlignTextBottom]';
        case EVerticalAlign.MIDDLE:
            return 'cssClass[verticalAlignMiddle]';
        case EVerticalAlign.TOP:
            return 'cssClass[verticalAlignTop]';
        case EVerticalAlign.BOTTOM:
            return 'cssClass[verticalAlignBottom]';
    }
};

/**
 * Преобразование значений скрытия колонок в css-классы.
 * @param {EScreenWidth} [size] Массив размеров ширины экрана, при которых скрывать колонку.
 */
export const mapScreenSizeToClassName = (size?: EScreenWidth): string | undefined => {
    switch (size) {
        case EScreenWidth.XS_MAX:
            return 'cssClass[hideXS]';
        case EScreenWidth.SM_MAX:
            return 'cssClass[hideSM]';
        case EScreenWidth.MD_MAX:
            return 'cssClass[hideMD]';
        case EScreenWidth.LG_MAX:
            return 'cssClass[hideLG]';
    }
};

/**
 * Преобразование типа ячейки в css-класс.
 * @param {ECellType} [cellType] Тип ячейки.
 */
export const mapCellTypeToClassName = (cellType: ECellType = ECellType.TEXT): string => cssClass(`${cellType}Type`);
