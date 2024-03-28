import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента AlertProcess.
export const designTokensComponentsAlertProcessKeys = [
    'Color',
    'Error_Background',
    'Error_Border_Color',
    'Feature_Background',
    'Feature_Border_Color',
    'Info_Background',
    'Info_Border_Color',
    'Warning_Background',
    'Warning_Border_Color',
] as const;
// Тип, содержащий названия токенов компонента AlertProcess.
export type TDesignTokensComponentsAlertProcessKeys = (typeof designTokensComponentsAlertProcessKeys)[number];
// Тип, содержащий названия токенов компонента AlertProcess и их значения.
export type TDesignTokensComponentsAlertProcessValue = Record<TDesignTokensComponentsAlertProcessKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента AlertProcess и их значения в светлой и темной теме.
export type TDesignTokensComponentsAlertProcessValues = Record<TDesignTokensComponentsAlertProcessKeys, TDesignTokenValues>;
// Тип локальных токенов компонента AlertProcess.
export type TDesignTokensComponentsAlertProcess = {AlertProcess: TDesignTokensComponentsAlertProcessValue};

// Токены компонента AlertProcess в светлой и темной темах.
export const AlertProcess_Tokens: TDesignTokensComponentsAlertProcessValues = {
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AlertProcess-Color)
    Error_Background: [{ref: 'Error.100'}, {ref: 'Basic.0'}], // var(--triplex-AlertProcess-Error_Background)
    Error_Border_Color: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-AlertProcess-Error_Border_Color)
    Feature_Background: [{ref: 'Primary.100'}, {ref: 'Basic.0'}], // var(--triplex-AlertProcess-Feature_Background)
    Feature_Border_Color: [{ref: 'Primary.500'}, {ref: 'Primary.500'}], // var(--triplex-AlertProcess-Feature_Border_Color)
    Info_Background: [{ref: 'Info.100'}, {ref: 'Basic.0'}], // var(--triplex-AlertProcess-Info_Background)
    Info_Border_Color: [{ref: 'Info.700'}, {ref: 'Info.500'}], // var(--triplex-AlertProcess-Info_Border_Color)
    Warning_Background: [{ref: 'Warning.100'}, {ref: 'Basic.0'}], // var(--triplex-AlertProcess-Warning_Background)
    Warning_Border_Color: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-AlertProcess-Warning_Border_Color)
};
