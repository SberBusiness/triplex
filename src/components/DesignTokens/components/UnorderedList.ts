import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента UnorderedList.
export const designTokensComponentsUnorderedListKeys = ['Color'] as const;
// Тип, содержащий названия токенов компонента UnorderedList.
export type TDesignTokensComponentsUnorderedListKeys = (typeof designTokensComponentsUnorderedListKeys)[number];
// Тип, содержащий названия токенов компонента UnorderedList и их значения.
export type TDesignTokensComponentsUnorderedListValue = Record<TDesignTokensComponentsUnorderedListKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента UnorderedList и их значения в светлой и темной теме.
export type TDesignTokensComponentsUnorderedListValues = Record<TDesignTokensComponentsUnorderedListKeys, TDesignTokenValues>;
// Тип локальных токенов компонента UnorderedList.
export type TDesignTokensComponentsUnorderedList = {UnorderedList: TDesignTokensComponentsUnorderedListValue};

// Токены компонента UnorderedList в светлой и темной темах.
export const UnorderedList_Tokens: TDesignTokensComponentsUnorderedListValues = {
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-UnorderedList-Color)
};
