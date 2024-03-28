import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента SMSInput.
export const designTokensComponentsSMSInputKeys = ['Refresh_Fill_Empty', 'Refresh_Fill_Full'] as const;
// Тип, содержащий названия токенов компонента SMSInput.
export type TDesignTokensComponentsSMSInputKeys = (typeof designTokensComponentsSMSInputKeys)[number];
// Тип, содержащий названия токенов компонента SMSInput и их значения.
export type TDesignTokensComponentsSMSInputValue = Record<TDesignTokensComponentsSMSInputKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SMSInput и их значения в светлой и темной теме.
export type TDesignTokensComponentsSMSInputValues = Record<TDesignTokensComponentsSMSInputKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SMSInput.
export type TDesignTokensComponentsSMSInput = {SMSInput: TDesignTokensComponentsSMSInputValue};

// Токены компонента SMSInput в светлой и темной темах.
export const SMSInput_Tokens: TDesignTokensComponentsSMSInputValues = {
    Refresh_Fill_Empty: [{ref: 'Neutral.700'}, {ref: 'Basic.300'}], // var(--triplex-SMSInput-Refresh_Fill_Empty)
    Refresh_Fill_Full: [{ref: 'Basic.300'}, {ref: 'Neutral.700'}], // var(--triplex-SMSInput-Refresh_Fill_Full)
};
