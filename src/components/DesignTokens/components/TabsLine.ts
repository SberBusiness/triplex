import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента TabsLine.
export const designTokensComponentsTabsLineKeys = [
    'BorderColor_Active',
    'BorderColor_Default',
    'BorderColor_Hover',
    'Color',
    'Notification_Color',
    'Separator_Background',
    'Shadow_Focus',
] as const;
// Тип, содержащий названия токенов компонента TabsLine.
export type TDesignTokensComponentsTabsLineKeys = (typeof designTokensComponentsTabsLineKeys)[number];
// Тип, содержащий названия токенов компонента TabsLine и их значения.
export type TDesignTokensComponentsTabsLineValue = Record<TDesignTokensComponentsTabsLineKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TabsLine и их значения в светлой и темной теме.
export type TDesignTokensComponentsTabsLineValues = Record<TDesignTokensComponentsTabsLineKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TabsLine.
export type TDesignTokensComponentsTabsLine = {TabsLine: TDesignTokensComponentsTabsLineValue};

// Токены компонента TabsLine в светлой и темной темах.
export const TabsLine_Tokens: TDesignTokensComponentsTabsLineValues = {
    BorderColor_Active: [{ref: 'Primary.900'}, {ref: 'Primary.500'}], // var(--triplex-TabsLine-BorderColor_Active)
    BorderColor_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-TabsLine-BorderColor_Default)
    BorderColor_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-TabsLine-BorderColor_Hover)
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-TabsLine-Color)
    Notification_Color: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-TabsLine-Notification_Color)
    Separator_Background: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-TabsLine-Separator_Background)
    Shadow_Focus: [{value: '0 0 0 1px #FFDD64 inset'}, {value: '0 0 0 1px #FFDD64 inset'}], // var(--triplex-TabsLine-Shadow_Focus)
};
