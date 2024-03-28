import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента AccordionForm.
export const designTokensComponentsAccordionFormKeys = [
    'Background_Default',
    'Background_Hover',
    'BorderColor_Default',
    'BorderColor_Focus',
    'Divider_Color',
    'Step_Line_Default',
    'Step_Line_Error',
    'Step_Line_Success',
    'Step_Line_Warning',
    'Title_Color_Default',
    'Title_Color_Disabled',
] as const;
// Тип, содержащий названия токенов компонента AccordionForm.
export type TDesignTokensComponentsAccordionFormKeys = (typeof designTokensComponentsAccordionFormKeys)[number];
// Тип, содержащий названия токенов компонента AccordionForm и их значения.
export type TDesignTokensComponentsAccordionFormValue = Record<TDesignTokensComponentsAccordionFormKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента AccordionForm и их значения в светлой и темной теме.
export type TDesignTokensComponentsAccordionFormValues = Record<TDesignTokensComponentsAccordionFormKeys, TDesignTokenValues>;
// Тип локальных токенов компонента AccordionForm.
export type TDesignTokensComponentsAccordionForm = {AccordionForm: TDesignTokensComponentsAccordionFormValue};

// Токены компонента AccordionForm в светлой и темной темах.
export const AccordionForm_Tokens: TDesignTokensComponentsAccordionFormValues = {
    Background_Default: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-AccordionForm-Background_Default)
    Background_Hover: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-AccordionForm-Background_Hover)
    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.500'}], // var(--triplex-AccordionForm-BorderColor_Default)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-AccordionForm-BorderColor_Focus)
    Divider_Color: [{ref: 'Neutral.500'}, {ref: 'Basic.500'}], // var(--triplex-AccordionForm-Divider_Color)
    Step_Line_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-AccordionForm-Step_Line_Default)
    Step_Line_Error: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-AccordionForm-Step_Line_Error)
    Step_Line_Success: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-AccordionForm-Step_Line_Success)
    Step_Line_Warning: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-AccordionForm-Step_Line_Warning)
    Title_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-AccordionForm-Title_Color_Default)
    Title_Color_Disabled: [{ref: 'Neutral.700'}, {ref: 'Neutral.900'}], // var(--triplex-AccordionForm-Title_Color_Disabled)
};
