import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Text.
export const designTokensComponentsTextKeys = [
    'General_Color',
    'Secondary_Color',
    'Success_Color',
    'Warning_Color',
    'Danger_Color',
    'Disabled_Color',
] as const;
// Тип, содержащий названия токенов компонента Text.
export type TDesignTokensComponentsTextKeys = (typeof designTokensComponentsTextKeys)[number];
// Тип, содержащий названия токенов компонента Text и их значения.
export type TDesignTokensComponentsTextValue = Record<TDesignTokensComponentsTextKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Text и их значения в светлой и темной теме.
export type TDesignTokensComponentsTextValues = Record<TDesignTokensComponentsTextKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Text.
export type TDesignTokensComponentsText = {Text: TDesignTokensComponentsTextValue};

// Токены компонента Text в светлой и темной темах.
export const Text_Tokens: TDesignTokensComponentsTextValues = {
    General_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Text-General_Color)
    Secondary_Color: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Text-Secondary_Color)
    Success_Color: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Text-Success_Color)
    Warning_Color: [{ref: 'Warning.700'}, {ref: 'Warning.500'}], // var(--triplex-Text-Warning_Color)
    Danger_Color: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-Text-Danger_Color)
    Disabled_Color: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Text-Disabled_Color)
};
