import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента TabsFolder.
export const designTokensComponentsTabsFolderKeys = [
    'Background',
    'ButtonNext_Background',
    'ButtonPrev_Background',

    'Shadow',

    'Tab_Background_Default',
    'Tab_Background_Hover',
    'Tab_Background_Selected',
    'Tab_BorderColor_Default',
    'Tab_BorderColor_Focus',
    'Tab_Color_Default',
    'Tab_Color_Disabled',
] as const;
// Тип, содержащий названия токенов компонента TabsFolder.
export type TDesignTokensComponentsTabsFolderKeys = (typeof designTokensComponentsTabsFolderKeys)[number];
// Тип, содержащий названия токенов компонента TabsFolder и их значения.
export type TDesignTokensComponentsTabsFolderValue = Record<TDesignTokensComponentsTabsFolderKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TabsFolder и их значения в светлой и темной теме.
export type TDesignTokensComponentsTabsFolderValues = Record<TDesignTokensComponentsTabsFolderKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TabsFolder.
export type TDesignTokensComponentsTabsFolder = {TabsFolder: TDesignTokensComponentsTabsFolderValue};

// Токены компонента TabsFolder в светлой и темной темах.
export const TabsFolder_Tokens: TDesignTokensComponentsTabsFolderValues = {
    Background: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-TabsFolder-Background)
    ButtonNext_Background: [
        {value: 'linear-gradient(to left, #F2F4F7 39.06%, transparent)'},
        {value: 'linear-gradient(to left, #1F1F22 39.06%, transparent)'},
    ], // var(--triplex-TabsFolder-ButtonNext_Background)
    ButtonPrev_Background: [
        {value: 'linear-gradient(to right, #F2F4F7 39.06%, transparent)'},
        {value: 'linear-gradient(to right, #1F1F22 39.06%, transparent)'},
    ], // var(--triplex-TabsFolder-ButtonPrev_Background)

    Shadow: [{value: '0 -1px 0 0 #D0D7DD inset'}, {value: '0 -1px 0 0 #565B62 inset'}], // var(--triplex-TabsFolder-Shadow)

    Tab_Background_Default: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-TabsFolder-Tab_Background_Default)
    Tab_Background_Hover: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-TabsFolder-Tab_Background_Hover)
    Tab_Background_Selected: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-TabsFolder-Tab_Background_Selected)
    Tab_BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-TabsFolder-Tab_BorderColor_Default)
    Tab_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-TabsFolder-Tab_BorderColor_Focus)
    Tab_Color_Default: [{ref: 'Basic.700'}, {ref: 'Basic.100'}], // var(--triplex-TabsFolder-Tab_Color_Default)
    Tab_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-TabsFolder-Tab_Color_Disabled)
};
