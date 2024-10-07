import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Tooltip.
export const designTokensComponentsTooltipKeys = [
    'Background',
    'Color',

    'Link_Desktop_Color_Active',
    'Link_Desktop_Color_Default',
    'Link_Desktop_Color_Hover',
    'Link_Desktop_Shadow_Focus',

    'Link_Mobile_Color_Active',
    'Link_Mobile_Color_Default',
    'Link_Mobile_Color_Hover',
    'Link_Mobile_Shadow_Focus',
] as const;
// Тип, содержащий названия токенов компонента Tooltip.
export type TDesignTokensComponentsTooltipKeys = (typeof designTokensComponentsTooltipKeys)[number];
// Тип, содержащий названия токенов компонента Tooltip и их значения.
export type TDesignTokensComponentsTooltipValue = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tooltip и их значения в светлой и темной теме.
export type TDesignTokensComponentsTooltipValues = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tooltip.
export type TDesignTokensComponentsTooltip = {Tooltip: TDesignTokensComponentsTooltipValue};

// Токены компонента Tooltip в светлой и темной темах.
export const Tooltip_Tokens: TDesignTokensComponentsTooltipValues = {
    Background: [{ref: 'Basic.700'}, {ref: 'Neutral.300'}], // var(--triplex-Tooltip-Background)
    Color: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Tooltip-Color)

    Link_Desktop_Color_Active: [{ref: 'Info.700'}, {ref: 'Info.900'}], // var(--triplex-Tooltip-Link_Desktop_Color_Active)
    Link_Desktop_Color_Default: [{ref: 'Info.500'}, {ref: 'Info.700'}], // var(--triplex-Tooltip-Link_Desktop_Color_Default)
    Link_Desktop_Color_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.700'}], // var(--triplex-Tooltip-Link_Desktop_Color_Hover)
    Link_Desktop_Shadow_Focus: [{value: '0 0 0 1px #FFDD64'}, {value: '0 0 0 1px #FFDD64'}], // var(--triplex-Tooltip-Link_Desktop_Shadow_Focus)

    Link_Mobile_Color_Active: [{ref: 'Info.900'}, {ref: 'Info.700'}], // var(--triplex-Tooltip-Link_Mobile_Color_Active)
    Link_Mobile_Color_Default: [{ref: 'Info.700'}, {ref: 'Info.500'}], // var(--triplex-Tooltip-Link_Mobile_Color_Default)
    Link_Mobile_Color_Hover: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Tooltip-Link_Mobile_Color_Hover)
    Link_Mobile_Shadow_Focus: [{value: '0 0 0 1px #FFDD64'}, {value: '0 0 0 1px #FFDD64'}], // var(--triplex-Tooltip-Link_Mobile_Shadow_Focus)
};
