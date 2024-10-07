import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Select.
export const designTokensComponentsSelectKeys = [
    'Background_Default',
    'Background_Disabled',

    'Caret_Color_Default',
    'Caret_Color_Disabled',

    'Border_Color_Default',
    'Border_Color_Disabled',
    'Border_Color_Error',
    'Border_Color_Focus',

    'Color_Default',
    'Color_Disabled',
    'Color_Placeholder',
] as const;
// Тип, содержащий названия токенов компонента Select.
export type TDesignTokensComponentsSelectKeys = (typeof designTokensComponentsSelectKeys)[number];
// Тип, содержащий названия токенов компонента Select и их значения.
export type TDesignTokensComponentsSelectValue = Record<TDesignTokensComponentsSelectKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Select и их значения в светлой и темной теме.
export type TDesignTokensComponentsSelectValues = Record<TDesignTokensComponentsSelectKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Select.
export type TDesignTokensComponentsSelect = {Select: TDesignTokensComponentsSelectValue};

// Токены компонента Select в светлой и темной темах.
export const Select_Tokens: TDesignTokensComponentsSelectValues = {
    Background_Default: [{ref: 'Basic.100'}, {value: 'none'}], // var(--triplex-Select-Background_Default)
    Background_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-Select-Background_Disabled)

    Border_Color_Default: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Select-Border_Color_Default)
    Border_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Select-Border_Color_Disabled)
    Border_Color_Error: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-Select-Border_Color_Error)
    Border_Color_Focus: [{ref: 'Basic.700'}, {ref: 'Neutral.700'}], // var(--triplex-Select-Border_Color_Focus)

    Caret_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.700'}], // var(--triplex-Select-Caret_Color_Default)
    Caret_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Select-Caret_Color_Disabled)

    Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Select-Color_Default)
    Color_Disabled: [{ref: 'Neutral.900'}, {ref: 'Basic.300'}], // var(--triplex-Select-Color_Disabled)
    Color_Placeholder: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Select-Color_Placeholder)
};
