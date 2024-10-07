import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Checkbox.
export const designTokensComponentsCheckboxKeys = [
    'Background_Default',
    'Background_Checked_Default',
    'Background_Checked_Hover',
    'Background_Disabled',

    'BorderColor_Checked',
    'BorderColor_Default',
    'BorderColor_Disabled',
    'BorderColor_Focus',
    'BorderColor_Hover',

    'Checkmark_Fill_Default',
    'Checkmark_Fill_Disabled',

    'Color_Default',
    'Color_Disabled',
] as const;
// Тип, содержащий названия токенов компонента Checkbox.
export type TDesignTokensComponentsCheckboxKeys = (typeof designTokensComponentsCheckboxKeys)[number];
// Тип, содержащий названия токенов компонента Checkbox и их значения.
export type TDesignTokensComponentsCheckboxValue = Record<TDesignTokensComponentsCheckboxKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Checkbox и их значения в светлой и темной теме.
export type TDesignTokensComponentsCheckboxValues = Record<TDesignTokensComponentsCheckboxKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Checkbox.
export type TDesignTokensComponentsCheckbox = {Checkbox: TDesignTokensComponentsCheckboxValue};

// Токены компонента Checkbox в светлой и темной темах.
export const Checkbox_Tokens: TDesignTokensComponentsCheckboxValues = {
    Background_Checked_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Checkbox-Background_Checked_Default)
    Background_Checked_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Checkbox-Background_Checked_Hover)
    Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.0'}], // var(--triplex-Checkbox-Background_Default)
    Background_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-Checkbox-Background_Disabled)

    BorderColor_Checked: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Checkbox-BorderColor_Checked)
    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Checkbox-BorderColor_Default)
    BorderColor_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Checkbox-BorderColor_Disabled)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Checkbox-BorderColor_Focus)
    BorderColor_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Checkbox-BorderColor_Hover)

    Checkmark_Fill_Default: [{ref: 'Basic.100'}, {ref: 'Neutral.300'}], // var(--triplex-Checkbox-Checkmark_Fill_Default)
    Checkmark_Fill_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Checkbox-Checkmark_Fill_Disabled)

    Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Checkbox-Color_Default)
    Color_Disabled: [{ref: 'Basic.700'}, {ref: 'Basic.300'}], // var(--triplex-Checkbox-Color_Disabled)
};
