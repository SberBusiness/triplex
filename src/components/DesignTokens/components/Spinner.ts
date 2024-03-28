import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Spinner.
export const designTokensComponentsSpinnerKeys = ['Text_Color'] as const;
// Тип, содержащий названия токенов компонента Spinner.
export type TDesignTokensComponentsSpinnerKeys = (typeof designTokensComponentsSpinnerKeys)[number];
// Тип, содержащий названия токенов компонента Spinner и их значения.
export type TDesignTokensComponentsSpinnerValue = Record<TDesignTokensComponentsSpinnerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Spinner и их значения в светлой и темной теме.
export type TDesignTokensComponentsSpinnerValues = Record<TDesignTokensComponentsSpinnerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Spinner.
export type TDesignTokensComponentsSpinner = {Spinner: TDesignTokensComponentsSpinnerValue};

// Токены компонента Spinner в светлой и темной темах.
export const Spinner_Tokens: TDesignTokensComponentsSpinnerValues = {
    Text_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Spinner-Text_Color)
};
