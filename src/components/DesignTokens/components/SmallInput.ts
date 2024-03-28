import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента SmallInput.
export const designTokensComponentsSmallInputKeys = ['Background'] as const;
// Тип, содержащий названия токенов компонента SmallInput.
export type TDesignTokensComponentsSmallInputKeys = (typeof designTokensComponentsSmallInputKeys)[number];
// Тип, содержащий названия токенов компонента SmallInput и их значения.
export type TDesignTokensComponentsSmallInputValue = Record<TDesignTokensComponentsSmallInputKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SmallInput и их значения в светлой и темной теме.
export type TDesignTokensComponentsSmallInputValues = Record<TDesignTokensComponentsSmallInputKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SmallInput.
export type TDesignTokensComponentsSmallInput = {SmallInput: TDesignTokensComponentsSmallInputValue};

// Токены компонента SmallInput в светлой и темной темах.
export const SmallInput_Tokens: TDesignTokensComponentsSmallInputValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-SmallInput-Background)
};
