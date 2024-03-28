import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Radio.
export const designTokensComponentsRadioKeys = [
    'Background_Checked_Default',
    'Background_Checked_Hover',
    'Background_Default',
    'Background_Disabled',
    'BorderColor_Default',
    'BorderColor_Checked',
    'BorderColor_Disabled',
    'BorderColor_Focused',
    'BorderColor_Hover',
    'Color_Default',
    'Color_Disabled',
    'Dot_Default',
    'Dot_Disabled',
] as const;
// Тип, содержащий названия токенов компонента Radio.
export type TDesignTokensComponentsRadioKeys = (typeof designTokensComponentsRadioKeys)[number];
// Тип, содержащий названия токенов компонента Radio и их значения.
export type TDesignTokensComponentsRadioValue = Record<TDesignTokensComponentsRadioKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Radio и их значения в светлой и темной теме.
export type TDesignTokensComponentsRadioValues = Record<TDesignTokensComponentsRadioKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Radio.
export type TDesignTokensComponentsRadio = {Radio: TDesignTokensComponentsRadioValue};

// Токены компонента Radio в светлой и темной темах.
export const Radio_Tokens: TDesignTokensComponentsRadioValues = {
    Background_Checked_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Radio-Background_Checked_Default)
    Background_Checked_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Radio-Background_Checked_Hover)
    Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.0'}], // var(--triplex-Radio-Background_Default)
    Background_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-Radio-Background_Disabled)
    BorderColor_Checked: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Radio-BorderColor_Checked)
    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Radio-BorderColor_Default)
    BorderColor_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Radio-BorderColor_Disabled)
    BorderColor_Focused: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Radio-BorderColor_Focused)
    BorderColor_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Radio-BorderColor_Hover)
    Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Radio-Color_Default)
    Color_Disabled: [{ref: 'Basic.700'}, {ref: 'Basic.300'}], // var(--triplex-Radio-Color_Disabled)
    Dot_Default: [{ref: 'Basic.100'}, {ref: 'Neutral.300'}], // var(--triplex-Radio-Dot_Default)
    Dot_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Radio-Dot_Disabled)
};
