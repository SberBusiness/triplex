import {ETextSize, ETitleSize, EFontType, EFontWeight, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

/** Соответствие размера текста стилевому классу. */
export const mapTextSizeToCssClass = {
    [ETextSize.B1]: 'cssClass[b1]',
    [ETextSize.B2]: 'cssClass[b2]',
    [ETextSize.B3]: 'cssClass[b3]',
};

/** Соответствие размера заголовка стилевому классу. */
export const mapTitleSizeToCssClass = {
    [ETitleSize.H1]: 'cssClass[h1]',
    [ETitleSize.H2]: 'cssClass[h2]',
    [ETitleSize.H3]: 'cssClass[h3]',
    [ETitleSize.H4]: 'cssClass[h4]',
};

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontTypeToCssClass = {
    [EFontType.GENERAL]: 'cssClass[general]',
    [EFontType.SECONDARY]: 'cssClass[secondary]',
    [EFontType.SUCCESS]: 'cssClass[success]',
    [EFontType.WARNING]: 'cssClass[warning]',
    [EFontType.DANGER]: 'cssClass[danger]',
    [EFontType.DISABLED]: 'cssClass[disabled]',
};

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightToCssClass = {
    [EFontWeight.LIGHT]: 'cssClass[light]',
    [EFontWeight.REGULAR]: 'cssClass[regular]',
    [EFontWeight.SEMIBOLD]: 'cssClass[semibold]',
    [EFontWeight.BOLD]: 'cssClass[bold]',
};

/** Соответствие типа высоты блока строки стилевому классу. */
export const mapLineTypeToCssClass = {
    [ELineType.NORMAL]: 'cssClass[normal]',
    [ELineType.EXTRA]: 'cssClass[extra]',
};
