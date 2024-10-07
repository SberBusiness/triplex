import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента ListItem.
export const designTokensComponentsListItemKeys = ['Background', 'Background_Selected'] as const;
// Тип, содержащий названия токенов компонента ListItem.
export type TDesignTokensComponentsListItemKeys = (typeof designTokensComponentsListItemKeys)[number];
// Тип, содержащий названия токенов компонента ListItem и их значения.
export type TDesignTokensComponentsListItemValue = Record<TDesignTokensComponentsListItemKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента ListItem и их значения в светлой и темной теме.
export type TDesignTokensComponentsListItemValues = Record<TDesignTokensComponentsListItemKeys, TDesignTokenValues>;
// Тип локальных токенов компонента ListItem.
export type TDesignTokensComponentsListItem = {ListItem: TDesignTokensComponentsListItemValue};

// Токены компонента ListItem в светлой и темной темах.
export const ListItem_Tokens: TDesignTokensComponentsListItemValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.900'}], // var(--triplex-ListItem-Background)
    Background_Selected: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-ListItem-Background_Selected)
};
