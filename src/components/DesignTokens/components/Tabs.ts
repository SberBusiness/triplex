import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Tabs.
export const designTokensComponentsTabsKeys = [
    'Background',
    'Tab_Background_Default',
    'Tab_Background_Hover',
    'Tab_Background_Selected',
    'Tab_BorderColor_Default',
    'Tab_BorderColor_Focus',
] as const;
// Тип, содержащий названия токенов компонента Tabs.
export type TDesignTokensComponentsTabsKeys = (typeof designTokensComponentsTabsKeys)[number];
// Тип, содержащий названия токенов компонента Tabs и их значения.
export type TDesignTokensComponentsTabsValue = Record<TDesignTokensComponentsTabsKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tabs и их значения в светлой и темной теме.
export type TDesignTokensComponentsTabsValues = Record<TDesignTokensComponentsTabsKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tabs.
export type TDesignTokensComponentsTabs = {Tabs: TDesignTokensComponentsTabsValue};

// Токены компонента Tabs в светлой и темной темах.
export const Tabs_Tokens: TDesignTokensComponentsTabsValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Tabs-Background)
    Tab_Background_Default: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Tabs-Tab_Background_Default)
    Tab_Background_Hover: [{ref: 'Neutral.100'}, {ref: 'Basic.300'}], // var(--triplex-Tabs-Tab_Background_Hover)
    Tab_Background_Selected: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Tabs-Tab_Background_Selected)
    Tab_BorderColor_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-Tabs-Tab_BorderColor_Default)
    Tab_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Tabs-Tab_BorderColor_Focus)
};
