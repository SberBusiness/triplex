import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Step.
export const designTokensComponentsStepKeys = [
    'Color_Disabled',
    'Color_Error',
    'Color_Success',
    'Color_Wait',
    'Color_Warning',

    'Background_Color_Disabled',
    'Background_Color_Error',
    'Background_Color_Success',
    'Background_Color_Wait',
    'Background_Color_Warning',

    'Border_Color_Disabled',
    'Border_Color_Error',
    'Border_Color_Success',
    'Border_Color_Wait',
    'Border_Color_Warning',
] as const;
// Тип, содержащий названия токенов компонента Step.
export type TDesignTokensComponentsStepKeys = (typeof designTokensComponentsStepKeys)[number];
// Тип, содержащий названия токенов компонента Step и их значения.
export type TDesignTokensComponentsStepValue = Record<TDesignTokensComponentsStepKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Step и их значения в светлой и темной теме.
export type TDesignTokensComponentsStepValues = Record<TDesignTokensComponentsStepKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Step.
export type TDesignTokensComponentsStep = {Step: TDesignTokensComponentsStepValue};

// Токены компонента Step в светлой и темной темах.
export const Step_Tokens: TDesignTokensComponentsStepValues = {
    Color_Disabled: [{ref: 'Neutral.700'}, {ref: 'Basic.700'}], // var(--triplex-Step-Color_Disabled)
    Color_Error: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Step-Color_Error)
    Color_Success: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Step-Color_Success)
    Color_Wait: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Step-Color_Wait)
    Color_Warning: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-Step-Color_Warning)

    Background_Color_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.300'}], // var(--triplex-Step-Background_Color_Disabled)
    Background_Color_Error: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-Step-Background_Color_Error)
    Background_Color_Success: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Step-Background_Color_Success)
    Background_Color_Wait: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Step-Background_Color_Wait)
    Background_Color_Warning: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Step-Background_Color_Warning)

    Border_Color_Disabled: [{value: 'transparent'}, {value: 'transparent'}], // var(--triplex-Step-Border_Color_Disabled)
    Border_Color_Error: [{value: 'transparent'}, {value: 'transparent'}], // var(--triplex-Step-Border_Color_Error)
    Border_Color_Success: [{value: 'transparent'}, {value: 'transparent'}], // var(--triplex-Step-Border_Color_Success)
    Border_Color_Wait: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Step-Border_Color_Wait)
    Border_Color_Warning: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-Step-Border_Color_Warning)
};
