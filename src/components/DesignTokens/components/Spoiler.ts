import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Spoiler.
export const designTokensComponentsSpoilerKeys = ['Caret_Color'] as const;
// Тип, содержащий названия токенов компонента Spoiler.
export type TDesignTokensComponentsSpoilerKeys = (typeof designTokensComponentsSpoilerKeys)[number];
// Тип, содержащий названия токенов компонента Spoiler и их значения.
export type TDesignTokensComponentsSpoilerValue = Record<TDesignTokensComponentsSpoilerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Spoiler и их значения в светлой и темной теме.
export type TDesignTokensComponentsSpoilerValues = Record<TDesignTokensComponentsSpoilerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Spoiler.
export type TDesignTokensComponentsSpoiler = {Spoiler: TDesignTokensComponentsSpoilerValue};

// Токены компонента Spoiler в светлой и темной темах.
export const Spoiler_Tokens: TDesignTokensComponentsSpoilerValues = {
    Caret_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.700'}], // var(--triplex-Spoiler-Caret_Color)
};
