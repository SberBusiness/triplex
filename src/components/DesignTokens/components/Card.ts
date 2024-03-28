import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Card.
export const designTokensComponentsCardKeys = [
    'BorderColor_Default',
    'BorderColor_Focus',
    'BorderColor_Selected',
    'Shadow_Default',
    'Shadow_Hover',
    'TableTotal_Color',
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
    BorderColor_Default: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Card-BorderColor_Default)
    BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Card-BorderColor_Focus)
    BorderColor_Selected: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Card-BorderColor_Selected)
    Shadow_Default: [{value: '0 1px 3px 0 rgba(31, 31, 34, 0.25)'}, {value: 'none'}], // var(--triplex-Card-Shadow_Default)
    Shadow_Hover: [{value: '0 2px 7px 0 rgba(31, 31, 34, 0.25)'}, {value: 'none'}], // var(--triplex-Card-Shadow_Hover)
    TableTotal_Color: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Card-TableTotal_Color)
};
