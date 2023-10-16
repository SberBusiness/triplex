import {EFontType, EFontWeight} from '@sberbusiness/triplex/components/Typography/enums';

/** Свойства компонента типографики. */
export interface ITypographyProps {
    /** Название тэга. */
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
