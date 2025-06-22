import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента TableBasicSettings.
export const designTokensComponentsTableBasicSettingsKeys = ['Footer_BorderColor'] as const;
// Тип, содержащий названия токенов компонента TableBasicSettings.
export type TDesignTokensComponentsTableBasicSettingsKeys = (typeof designTokensComponentsTableBasicSettingsKeys)[number];
// Тип, содержащий названия токенов компонента TableBasicSettings и их значения.
export type TDesignTokensComponentsTableBasicSettingsValue = Record<TDesignTokensComponentsTableBasicSettingsKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TableBasicSettings и их значения в светлой и темной теме.
export type TDesignTokensComponentsTableBasicSettingsValues = Record<TDesignTokensComponentsTableBasicSettingsKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TableBasicSettings.
export type TDesignTokensComponentsTableBasicSettings = {TableBasicSettings: TDesignTokensComponentsTableBasicSettingsValue};

// Токены компонента TableBasicSettings в светлой и темной темах.
export const TableBasicSettings_Tokens: TDesignTokensComponentsTableBasicSettingsValues = {
    Footer_BorderColor: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-TableBasicSettings-Footer_BorderColor)
};
