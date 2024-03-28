import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента FormField.
export const designTokensComponentsFormFieldKeys = [
    'Description_Color_Default',
    'Description_Color_Error',
    'Label_Background',
    'Label_Color_Default',
    'Label_Color_Disabled',
    'Placeholder_Color',
    'Shadow_Default',
    'Shadow_Disabled',
    'Shadow_Error',
    'Shadow_Focus',
] as const;
// Тип, содержащий названия токенов компонента FormField.
export type TDesignTokensComponentsFormFieldKeys = (typeof designTokensComponentsFormFieldKeys)[number];
// Тип, содержащий названия токенов компонента FormField и их значения.
export type TDesignTokensComponentsFormFieldValue = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента FormField и их значения в светлой и темной теме.
export type TDesignTokensComponentsFormFieldValues = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValues>;
// Тип локальных токенов компонента FormField.
export type TDesignTokensComponentsFormField = {FormField: TDesignTokensComponentsFormFieldValue};

// Токены компонента FormField в светлой и темной темах.
export const FormField_Tokens: TDesignTokensComponentsFormFieldValues = {
    Description_Color_Default: [{ref: 'Basic.300'}, {ref: 'Neutral.300'}], // var(--triplex-FormField-Description_Color_Default)
    Description_Color_Error: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-FormField-Description_Color_Error)
    Label_Background: [
        {value: 'linear-gradient(transparent 7px, #FFFFFF 7px 8px, transparent 8px)'},
        {value: 'linear-gradient(transparent 7px, #1F1F22 7px 8px, transparent 8px)'},
    ], // var(--triplex-FormField-Label_Background)
    Label_Color_Default: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-FormField-Label_Color_Default)
    Label_Color_Disabled: [{ref: 'Neutral.900'}, {ref: 'Basic.300'}], // var(--triplex-FormField-Label_Color_Disabled)
    Placeholder_Color: [{ref: 'Neutral.700'}, {ref: 'Basic.300'}], // var(--triplex-FormField-Placeholder_Color)
    Shadow_Default: [{value: '0 0 0 1px #D0D7DD inset'}, {value: '0 0 0 1px #7D838A inset'}], // var(--triplex-FormField-Shadow_Default)
    Shadow_Disabled: [{value: '0 0 0 1px #D0D7DD inset'}, {value: '0 0 0 1px #565B62 inset'}], // var(--triplex-FormField-Shadow_Disabled)
    Shadow_Error: [{value: '0 0 0 1px #C11030 inset'}, {value: '0 0 0 1px #DB1237 inset'}], // var(--triplex-FormField-Shadow_Error)
    Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-FormField-Shadow_Focus)
};
