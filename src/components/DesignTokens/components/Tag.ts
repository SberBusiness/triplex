import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Tag.
export const designTokensComponentsTagKeys = ['Color', 'Background', 'BorderColor'] as const;
// Тип, содержащий названия токенов компонента Tag.
export type TDesignTokensComponentsTagKeys = (typeof designTokensComponentsTagKeys)[number];
// Тип, содержащий названия токенов компонента Tag и их значения.
export type TDesignTokensComponentsTagValue = Record<TDesignTokensComponentsTagKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tag и их значения в светлой и темной теме.
export type TDesignTokensComponentsTagValues = Record<TDesignTokensComponentsTagKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tag.
export type TDesignTokensComponentsTag = {Tag: TDesignTokensComponentsTagValue};

// Токены компонента Tag в светлой и темной темах.
export const Tag_Tokens: TDesignTokensComponentsTagValues = {
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Tag-Color)
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Tag-Background)
    BorderColor: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Tag-BorderColor)
};
