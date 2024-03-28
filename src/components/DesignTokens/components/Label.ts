import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Label.
export const designTokensComponentsLabelKeys = ['Code_Color', 'Color', 'Description_Color'] as const;
// Тип, содержащий названия токенов компонента Label.
export type TDesignTokensComponentsLabelKeys = (typeof designTokensComponentsLabelKeys)[number];
// Тип, содержащий названия токенов компонента Label и их значения.
export type TDesignTokensComponentsLabelValue = Record<TDesignTokensComponentsLabelKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Label и их значения в светлой и темной теме.
export type TDesignTokensComponentsLabelValues = Record<TDesignTokensComponentsLabelKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Label.
export type TDesignTokensComponentsLabel = {Label: TDesignTokensComponentsLabelValue};

// Токены компонента Label в светлой и темной темах.
export const Label_Tokens: TDesignTokensComponentsLabelValues = {
    Code_Color: [{ref: 'Neutral.700'}, {ref: 'Basic.300'}], // var(--triplex-Label-Code_Color)
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Label-Color)
    Description_Color: [{ref: 'Neutral.900'}, {ref: 'Basic.300'}], // var(--triplex-Label-Description_Color)
};
