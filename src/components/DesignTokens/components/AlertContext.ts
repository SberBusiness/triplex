import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента AlertContext.
export const designTokensComponentsAlertContextKeys = ['Error_Color', 'Info_Color', 'Warning_Color', 'System_Color'] as const;
// Тип, содержащий названия токенов компонента AlertContext.
export type TDesignTokensComponentsAlertContextKeys = (typeof designTokensComponentsAlertContextKeys)[number];
// Тип, содержащий названия токенов компонента AlertContext и их значения.
export type TDesignTokensComponentsAlertContextValue = Record<TDesignTokensComponentsAlertContextKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента AlertContext и их значения в светлой и темной теме.
export type TDesignTokensComponentsAlertContextValues = Record<TDesignTokensComponentsAlertContextKeys, TDesignTokenValues>;
// Тип локальных токенов компонента AlertContext.
export type TDesignTokensComponentsAlertContext = {AlertContext: TDesignTokensComponentsAlertContextValue};

// Токены компонента AlertContext в светлой и темной темах.
export const AlertContext_Tokens: TDesignTokensComponentsAlertContextValues = {
    Error_Color: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-AlertContext-Error_Color)
    Info_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AlertContext-Info_Color)
    Warning_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AlertContext-Warning_Color)
    System_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AlertContext-System_Color)
};
