import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Stepper.
export const designTokensComponentsStepperKeys = [
    'Background',

    'ButtonNext_Background',
    'ButtonPrev_Background',

    'Progress_Background_Default',
    'Progress_Background_Filled',

    'Step_Background_Default',
    'Step_Background_Selected',
    'Step_BorderColor_Default',
    'Step_BorderColor_Disabled',
    'Step_BorderColor_Focus',
    'Step_BorderColor_Hover',
    'Step_Color_Default',
    'Step_Color_Disabled',
    'Step_Color_Intact',
    'Step_Color_Selected',

    'Wrapper_Background',
    'Wrapper_BoxShadow',
] as const;
// Тип, содержащий названия токенов компонента Stepper.
export type TDesignTokensComponentsStepperKeys = (typeof designTokensComponentsStepperKeys)[number];
// Тип, содержащий названия токенов компонента Stepper и их значения.
export type TDesignTokensComponentsStepperValue = Record<TDesignTokensComponentsStepperKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Stepper и их значения в светлой и темной теме.
export type TDesignTokensComponentsStepperValues = Record<TDesignTokensComponentsStepperKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Stepper.
export type TDesignTokensComponentsStepper = {Stepper: TDesignTokensComponentsStepperValue};

// Токены компонента Stepper в светлой и темной темах.
export const Stepper_Tokens: TDesignTokensComponentsStepperValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-Stepper-Background)

    ButtonNext_Background: [
        {value: 'linear-gradient(to left, #FFFFFF 39.06%, transparent)'},
        {value: 'linear-gradient(to left, #181819 39.06%, transparent)'},
    ], // var(--triplex-Stepper-ButtonNext_Background)
    ButtonPrev_Background: [
        {value: 'linear-gradient(to right, #FFFFFF 39.06%, transparent)'},
        {value: 'linear-gradient(to right, #181819 39.06%, transparent)'},
    ], // var(--triplex-Stepper-ButtonPrev_Background)

    Progress_Background_Default: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-Stepper-Progress_Background_Default)
    Progress_Background_Filled: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Stepper-Progress_Background_Filled)

    Step_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.0'}], // var(--triplex-Stepper-Step_Background_Default)
    Step_Background_Selected: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-Stepper-Step_Background_Selected)
    Step_BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Stepper-Step_BorderColor_Default)
    Step_BorderColor_Disabled: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-Stepper-Step_BorderColor_Disabled)
    Step_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Stepper-Step_BorderColor_Focus)
    Step_BorderColor_Hover: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Stepper-Step_BorderColor_Hover)
    Step_Color_Default: [{ref: 'Basic.300'}, {ref: 'Neutral.700'}], // var(--triplex-Stepper-Step_Color_Default)
    Step_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Stepper-Step_Color_Disabled)
    Step_Color_Intact: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Stepper-Step_Color_Intact)
    Step_Color_Selected: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Stepper-Step_Color_Selected)

    Wrapper_Background: [{value: 'linear-gradient(#FFFFFF 64px, transparent 0)'}, {ref: 'Basic.900'}], // var(--triplex-Stepper-Wrapper_Background)
    Wrapper_BoxShadow: [{value: '0 10px 15px 0 rgba(228, 232, 235, 0.5)'}, {value: 'none'}], // var(--triplex-Stepper-Wrapper_BoxShadow)
};
