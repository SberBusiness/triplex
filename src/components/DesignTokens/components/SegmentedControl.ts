import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента SegmentedControl.
export const designTokensComponentsSegmentedControlKeys = [
    'General_Background_Default',
    'General_Background_Disabled',
    'General_Background_Selected_Default',
    'General_Background_Selected_Disabled',

    'General_BorderColor_Default',
    'General_BorderColor_Disabled',
    'General_BorderColor_Focus',
    'General_BorderColor_Hover',
    'General_BorderColor_Selected_Default',
    'General_BorderColor_Selected_Disabled',
    'General_Multiple_BorderColor_Selected_Hover',

    'General_Multiple_Background_Selected_Hover',
    'General_Color_Default',
    'General_Color_Disabled',
    'General_Color_Selected_Default',
    'General_Color_Selected_Disabled',

    'Secondary_Background_Default',
    'Secondary_Background_Disabled',
    'Secondary_Background_Selected_Default',
    'Secondary_Background_Selected_Disabled',

    'Secondary_BorderColor_Default',
    'Secondary_BorderColor_Disabled',
    'Secondary_BorderColor_Focus',
    'Secondary_BorderColor_Hover',
    'Secondary_BorderColor_Selected_Default',
    'Secondary_BorderColor_Selected_Disabled',
    'Secondary_Multiple_BorderColor_Selected_Hover',

    'Secondary_Multiple_Background_Selected_Hover',
    'Secondary_Color_Default',
    'Secondary_Color_Disabled',
    'Secondary_Color_Selected_Default',
    'Secondary_Color_Selected_Disabled',
] as const;
// Тип, содержащий названия токенов компонента SegmentedControl.
export type TDesignTokensComponentsSegmentedControlKeys = (typeof designTokensComponentsSegmentedControlKeys)[number];
// Тип, содержащий названия токенов компонента SegmentedControl и их значения.
export type TDesignTokensComponentsSegmentedControlValue = Record<TDesignTokensComponentsSegmentedControlKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SegmentedControl и их значения в светлой и темной теме.
export type TDesignTokensComponentsSegmentedControlValues = Record<TDesignTokensComponentsSegmentedControlKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SegmentedControl.
export type TDesignTokensComponentsSegmentedControl = {SegmentedControl: TDesignTokensComponentsSegmentedControlValue};

// Токены компонента SegmentedControl в светлой и темной темах.
export const SegmentedControl_Tokens: TDesignTokensComponentsSegmentedControlValues = {
    General_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-SegmentedControl-General_Background_Default)
    General_Background_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-SegmentedControl-General_Background_Disabled)
    General_Background_Selected_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-SegmentedControl-General_Background_Selected_Default)
    General_Background_Selected_Disabled: [{ref: 'Primary.300'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-General_Background_Selected_Disabled)
    General_Multiple_Background_Selected_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-SegmentedControl-General_Multiple_Background_Selected_Hover)

    General_BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-General_BorderColor_Default)
    General_BorderColor_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-General_BorderColor_Disabled)
    General_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-SegmentedControl-General_BorderColor_Focus)
    General_BorderColor_Hover: [{ref: 'Basic.700'}, {ref: 'Neutral.900'}], // var(--triplex-SegmentedControl-General_BorderColor_Hover)
    General_BorderColor_Selected_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-SegmentedControl-General_BorderColor_Selected_Default)
    General_BorderColor_Selected_Disabled: [{ref: 'Primary.300'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-General_BorderColor_Selected_Disabled)
    General_Multiple_BorderColor_Selected_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-SegmentedControl-General_Multiple_BorderColor_Selected_Hover)

    General_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-SegmentedControl-General_Color_Default)
    General_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-General_Color_Disabled)
    General_Color_Selected_Default: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-SegmentedControl-General_Color_Selected_Default)
    General_Color_Selected_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-General_Color_Selected_Disabled)

    Secondary_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-SegmentedControl-Secondary_Background_Default)
    Secondary_Background_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-SegmentedControl-Secondary_Background_Disabled)
    Secondary_Background_Selected_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-Secondary_Background_Selected_Default)
    Secondary_Background_Selected_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-Secondary_Background_Selected_Disabled)
    Secondary_Multiple_Background_Selected_Hover: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-Secondary_Multiple_Background_Selected_Hover)

    Secondary_BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Default)
    Secondary_BorderColor_Disabled: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Disabled)
    Secondary_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Focus)
    Secondary_BorderColor_Hover: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Hover)
    Secondary_BorderColor_Selected_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Selected_Default)
    Secondary_BorderColor_Selected_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-Secondary_BorderColor_Selected_Disabled)
    Secondary_Multiple_BorderColor_Selected_Hover: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-SegmentedControl-Secondary_Multiple_BorderColor_Selected_Hover)

    Secondary_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-SegmentedControl-Secondary_Color_Default)
    Secondary_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-Secondary_Color_Disabled)
    Secondary_Color_Selected_Default: [{ref: 'Basic.300'}, {ref: 'Neutral.500'}], // var(--triplex-SegmentedControl-Secondary_Color_Selected_Default)
    Secondary_Color_Selected_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-SegmentedControl-Secondary_Color_Selected_Disabled)
};
