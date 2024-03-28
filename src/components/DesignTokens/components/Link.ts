import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Link.
export const designTokensComponentsLinkKeys = [
    'BorderColor_Default',
    'BorderColor_Focus',
    'Text_Color_Default',
    'Text_Color_Hover',
    'Text_Color_Active',
    'Line_Color_Default',
    'Line_Color_Hover',
    'Line_Color_Active',
] as const;
// Тип, содержащий названия токенов компонента Link.
export type TDesignTokensComponentsLinkKeys = (typeof designTokensComponentsLinkKeys)[number];
// Тип, содержащий названия токенов компонента Link и их значения.
export type TDesignTokensComponentsLinkValue = Record<TDesignTokensComponentsLinkKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Link и их значения в светлой и темной теме.
export type TDesignTokensComponentsLinkValues = Record<TDesignTokensComponentsLinkKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Link.
export type TDesignTokensComponentsLink = {Link: TDesignTokensComponentsLinkValue};

// Токены компонента Link в светлой и темной темах.
export const Link_Tokens: TDesignTokensComponentsLinkValues = {
    BorderColor_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-Link-BorderColor_Default)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Link-BorderColor_Focus)
    Text_Color_Default: [{ref: 'Info.700'}, {ref: 'Info.500'}], // var(--triplex-Link-Text_Color_Default)
    Text_Color_Hover: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Link-Text_Color_Hover)
    Text_Color_Active: [{ref: 'Info.900'}, {ref: 'Info.700'}], // var(--triplex-Link-Text-Color_Active)
    Line_Color_Default: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Link-Line_Color_Default)
    Line_Color_Hover: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Link-Line_Color_Hover)
    Line_Color_Active: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Link-Line_Color_Active)
};
