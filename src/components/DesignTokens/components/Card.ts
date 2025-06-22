import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Card.
export const designTokensComponentsCardKeys = [
    'Background',

    'BorderColor_Default',
    'BorderColor_Focus',
    'BorderColor_Hover',
    'BorderColor_Selected_Default',
    'BorderColor_Selected_Hover',

    'Shadow_Default',
    'Shadow_Hover',
] as const;
// Тип, содержащий названия токенов компонента Card.
export type TDesignTokensComponentsCardKeys = (typeof designTokensComponentsCardKeys)[number];
// Тип, содержащий названия токенов компонента Card и их значения.
export type TDesignTokensComponentsCardValue = Record<TDesignTokensComponentsCardKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Card и их значения в светлой и темной теме.
export type TDesignTokensComponentsCardValues = Record<TDesignTokensComponentsCardKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Card.
export type TDesignTokensComponentsCard = {Card: TDesignTokensComponentsCardValue};

// Токены компонента Card в светлой и темной темах.
export const Card_Tokens: TDesignTokensComponentsCardValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Card-Background)

    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Card-BorderColor_Default)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Card-BorderColor_Focus)
    BorderColor_Hover: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Card-BorderColor_Hover)
    BorderColor_Selected_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Card-BorderColor_Selected_Default)
    BorderColor_Selected_Hover: [{ref: 'Primary.700'}, {ref: 'Primary.300'}], // var(--triplex-Card-BorderColor_Selected_Hover)

    Shadow_Default: [{value: '0 1px 3px 0 rgba(31, 31, 34, 0.25)'}, {value: 'none'}], // var(--triplex-Card-Shadow_Default)
    Shadow_Hover: [{value: '0 2px 7px 0 rgba(31, 31, 34, 0.25)'}, {value: 'none'}], // var(--triplex-Card-Shadow_Hover)
};
