import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента AccordionView.
export const designTokensComponentsAccordionViewKeys = ['BorderColor_Default', 'BorderColor_Focus', 'Header_Color'] as const;
// Тип, содержащий названия токенов компонента AccordionView.
export type TDesignTokensComponentsAccordionViewKeys = (typeof designTokensComponentsAccordionViewKeys)[number];
// Тип, содержащий названия токенов компонента AccordionView и их значения.
export type TDesignTokensComponentsAccordionViewValue = Record<TDesignTokensComponentsAccordionViewKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента AccordionView и их значения в светлой и темной теме.
export type TDesignTokensComponentsAccordionViewValues = Record<TDesignTokensComponentsAccordionViewKeys, TDesignTokenValues>;
// Тип локальных токенов компонента AccordionView.
export type TDesignTokensComponentsAccordionView = {AccordionView: TDesignTokensComponentsAccordionViewValue};

// Токены компонента AccordionView в светлой и темной темах.
export const AccordionView_Tokens: TDesignTokensComponentsAccordionViewValues = {
    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.500'}], // var(--triplex-AccordionView-BorderColor_Default)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-AccordionView-BorderColor_Focus)
    Header_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AccordionView-Header_Color)
};
