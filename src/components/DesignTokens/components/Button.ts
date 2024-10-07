import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Button.
export const designTokensComponentsButtonKeys = [
    'General_Background_Active',
    'General_Background_Default',
    'General_Background_Disabled',
    'General_Background_Hover',
    'General_Caret_Color_Default',
    'General_Caret_Color_Disabled',
    'General_Color_Active',
    'General_Color_Default',
    'General_Color_Disabled',
    'General_Color_Hover',
    'General_Shadow_Focus',

    'Secondary_Background_Active',
    'Secondary_Background_Default',
    'Secondary_Background_Disabled',
    'Secondary_Background_Hover',
    'Secondary_Caret_Color_Active',
    'Secondary_Caret_Color_Default',
    'Secondary_Caret_Color_Disabled',
    'Secondary_Caret_Color_Hover',
    'Secondary_Color_Active',
    'Secondary_Color_Default',
    'Secondary_Color_Disabled',
    'Secondary_Color_Hover',
    'Secondary_Shadow_Active',
    'Secondary_Shadow_Default',
    'Secondary_Shadow_Disabled',
    'Secondary_Shadow_Hover',
    'Secondary_Shadow_Focus',

    'Danger_Background_Active',
    'Danger_Background_Default',
    'Danger_Background_Disabled',
    'Danger_Background_Hover',
    'Danger_Caret_Color_Default',
    'Danger_Caret_Color_Disabled',
    'Danger_Color_Active',
    'Danger_Color_Default',
    'Danger_Color_Disabled',
    'Danger_Color_Hover',
    'Danger_Shadow_Focus',

    'Dots_Background_Active',
    'Dots_Background_Default',
    'Dots_Background_Disabled',
    'Dots_Background_Hover',
    'Dots_Color_Active',
    'Dots_Color_Default',
    'Dots_Color_Disabled',
    'Dots_Color_Hover',
    'Dots_Shadow_Active',
    'Dots_Shadow_Default',
    'Dots_Shadow_Disabled',
    'Dots_Shadow_Hover',
    'Dots_Shadow_Focus',

    'Icon_Shadow_Focus',

    'Link_Color_Active',
    'Link_Color_Default',
    'Link_Color_Disabled',
    'Link_Color_Hover',
    'Link_Shadow_Focus',

    'Tile_Background_Active',
    'Tile_Background_Default',
    'Tile_Background_Disabled',
    'Tile_Background_Hover',
    'Tile_Shadow_Focus',
] as const;

// Тип, содержащий названия токенов компонента Button.
export type TDesignTokensComponentsButtonKeys = (typeof designTokensComponentsButtonKeys)[number];
// Тип, содержащий названия токенов компонента Button и их значения.
export type TDesignTokensComponentsButtonValue = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Button и их значения в светлой и темной теме.
export type TDesignTokensComponentsButtonValues = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Button.
export type TDesignTokensComponentsButton = {Button: TDesignTokensComponentsButtonValue};

// Токены компонента Button в светлой и темной темах.
export const Button_Tokens: TDesignTokensComponentsButtonValues = {
    General_Background_Active: [{ref: 'Primary.900'}, {ref: 'Primary.300'}], // var(--triplex-Button-General_Background_Active)
    General_Background_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Button-General_Background_Default)
    General_Background_Disabled: [{ref: 'Primary.300'}, {ref: 'Basic.300'}], // var(--triplex-Button-General_Background_Disabled)
    General_Background_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Button-General_Background_Hover)
    General_Caret_Color_Default: [{ref: 'Basic.100'}, {ref: 'Basic.100'}], // var(--triplex-Button-General_Caret_Color_Default)
    General_Caret_Color_Disabled: [{ref: 'Basic.100'}, {ref: 'Neutral.900'}], // var(--triplex-Button-General_Caret_Color_Disabled)
    General_Color_Active: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-General_Color_Active)
    General_Color_Default: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-General_Color_Default)
    General_Color_Disabled: [{ref: 'Basic.100'}, {ref: 'Neutral.900'}], // var(--triplex-Button-General_Color_Disabled)
    General_Color_Hover: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-General_Color_Hover)
    General_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-General_Shadow_Focus)

    Secondary_Background_Active: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Secondary_Background_Active)
    Secondary_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Secondary_Background_Default)
    Secondary_Background_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Secondary_Background_Disabled)
    Secondary_Background_Hover: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Secondary_Background_Hover)
    Secondary_Caret_Color_Active: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Caret_Color_Active)
    Secondary_Caret_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Caret_Color_Default)
    Secondary_Caret_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Secondary_Caret_Color_Disabled)
    Secondary_Caret_Color_Hover: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Caret_Color_Hover)
    Secondary_Color_Active: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Color_Active)
    Secondary_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Color_Default)
    Secondary_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Secondary_Color_Disabled)
    Secondary_Color_Hover: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Secondary_Color_Hover)
    Secondary_Shadow_Active: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Secondary_Shadow_Active)
    Secondary_Shadow_Default: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Secondary_Shadow_Default)
    Secondary_Shadow_Disabled: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Secondary_Shadow_Disabled)
    Secondary_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-Secondary_Shadow_Focus)
    Secondary_Shadow_Hover: [{value: '0px 0px 0px 1px #1F1F22 inset'}, {value: '0px 0px 0px 1px #F2F4F7 inset'}], // var(--triplex-Button-Secondary_Shadow_Hover)

    Danger_Background_Active: [{ref: 'Error.900'}, {ref: 'Error.300'}], // var(--triplex-Button-Danger_Background_Active)
    Danger_Background_Default: [{ref: 'Error.700'}, {ref: 'Error.500'}], // var(--triplex-Button-Danger_Background_Default)
    Danger_Background_Disabled: [{ref: 'Error.300'}, {ref: 'Basic.300'}], // var(--triplex-Button-Danger_Background_Disabled)
    Danger_Background_Hover: [{ref: 'Error.500'}, {ref: 'Error.700'}], // var(--triplex-Button-Danger_Background_Hover)
    Danger_Caret_Color_Default: [{ref: 'Basic.100'}, {ref: 'Basic.100'}], // var(--triplex-Button-Danger_Caret_Color_Default)
    Danger_Caret_Color_Disabled: [{ref: 'Basic.100'}, {ref: 'Neutral.900'}], // var(--triplex-Button-Danger_Caret_Color_Disabled)
    Danger_Color_Active: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Danger_Color_Active)
    Danger_Color_Default: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Danger_Color_Default)
    Danger_Color_Disabled: [{ref: 'Basic.100'}, {ref: 'Neutral.900'}], // var(--triplex-Button-Danger_Color_Disabled)
    Danger_Color_Hover: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Danger_Color_Hover)
    Danger_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-Danger_Shadow_Focus)

    Dots_Background_Active: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Dots_Background_Active)
    Dots_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Dots_Background_Default)
    Dots_Background_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Dots_Background_Disabled)
    Dots_Background_Hover: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Dots_Background_Hover)
    Dots_Color_Active: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Dots_Color_Active)
    Dots_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Dots_Color_Default)
    Dots_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Dots_Color_Disabled)
    Dots_Color_Hover: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Button-Dots_Color_Hover)
    Dots_Shadow_Active: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Dots_Shadow_Active)
    Dots_Shadow_Default: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Dots_Shadow_Default)
    Dots_Shadow_Disabled: [{value: '0px 0px 0px 1px #D0D7DD inset'}, {value: '0px 0px 0px 1px #565B62 inset'}], // var(--triplex-Button-Dots_Shadow_Disabled)
    Dots_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-Dots_Shadow_Focus)
    Dots_Shadow_Hover: [{value: '0px 0px 0px 1px #1F1F22 inset'}, {value: '0px 0px 0px 1px #F2F4F7 inset'}], // var(--triplex-Button-Dots_Shadow_Hover)

    Icon_Shadow_Focus: [{value: '0 0 0 1px #FFDD64'}, {value: '0 0 0 1px #FFDD64'}], // var(--triplex-Button-Icon_Shadow_Focus)

    Link_Color_Active: [{ref: 'Info.900'}, {ref: 'Info.700'}], // var(--triplex-Button-Link_Color_Active)
    Link_Color_Default: [{ref: 'Info.700'}, {ref: 'Info.500'}], // var(--triplex-Button-Link_Color_Default)
    Link_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Button-Link_Color_Disabled)
    Link_Color_Hover: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Button-Link_Color_Hover)
    Link_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-Link_Shadow_Focus)

    Tile_Background_Active: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-Button-Tile_Background_Active)
    Tile_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Button-Tile_Background_Default)
    Tile_Background_Disabled: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Button-Tile_Background_Disabled)
    Tile_Background_Hover: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-Button-Tile_Background_Hover)
    Tile_Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-Button-Tile_Shadow_Focus)
};
