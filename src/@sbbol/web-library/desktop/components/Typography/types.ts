import {EFontType, EFontWeight} from '@sbbol/web-library/desktop/components/Typography/enums';

/** Свойства компонента типографики. */
export interface ITypographyProps {
    /** HTML-элемент. */
    tag?: string;
    /** Тип (цвет шрифта) */
    type?: EFontType;
    /** Толщина шрифта. */
    weight?: EFontWeight;
    /** Наличие подчёркивания. */
    underline?: boolean;
    /** Наличие зачёркивания. */
    strikethrough?: boolean;
}
