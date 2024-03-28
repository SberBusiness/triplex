import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Title.
export const designTokensComponentsTitleKeys = [
    'General_Color',
    'Secondary_Color',
    'Success_Color',
    'Warning_Color',
    'Danger_Color',
    'Disabled_Color',
] as const;
// Тип, содержащий названия токенов компонента Title.
export type TDesignTokensComponentsTitleKeys = (typeof designTokensComponentsTitleKeys)[number];
// Тип, содержащий названия токенов компонента Title и их значения.
export type TDesignTokensComponentsTitleValue = Record<TDesignTokensComponentsTitleKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Title и их значения в светлой и темной теме.
export type TDesignTokensComponentsTitleValues = Record<TDesignTokensComponentsTitleKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Title.
export type TDesignTokensComponentsTitle = {Title: TDesignTokensComponentsTitleValue};

// Токены компонента Title в светлой и темной темах.
export const Title_Tokens: TDesignTokensComponentsTitleValues = {
    General_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Title-General_Color)
    Secondary_Color: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Title-Secondary_Color)
    Success_Color: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Title-Success_Color)
    Warning_Color: [{ref: 'Warning.700'}, {ref: 'Warning.500'}], // var(--triplex-Title-Warning_Color)
    Danger_Color: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-Title-Danger_Color)
    Disabled_Color: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Title-Disabled_Color)
};
