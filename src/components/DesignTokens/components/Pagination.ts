import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Pagination.
export const designTokensComponentsPaginationKeys = [
    'PageButton_Background_Active',
    'PageButton_Background_Default',
    'PageButton_Background_Hover',
    'PageButton_Background_Selected',
    'PageButton_BorderColor_Default',
    'PageButton_BorderColor_Focus',
    'PageButton_Color',
] as const;
// Тип, содержащий названия токенов компонента Pagination.
export type TDesignTokensComponentsPaginationKeys = (typeof designTokensComponentsPaginationKeys)[number];
// Тип, содержащий названия токенов компонента Pagination и их значения.
export type TDesignTokensComponentsPaginationValue = Record<TDesignTokensComponentsPaginationKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Pagination и их значения в светлой и темной теме.
export type TDesignTokensComponentsPaginationValues = Record<TDesignTokensComponentsPaginationKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Pagination.
export type TDesignTokensComponentsPagination = {Pagination: TDesignTokensComponentsPaginationValue};

// Токены компонента Pagination в светлой и темной темах.
export const Pagination_Tokens: TDesignTokensComponentsPaginationValues = {
    PageButton_Background_Active: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-Pagination-PageButton_Background_Active)
    PageButton_Background_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-Pagination-PageButton_Background_Default)
    PageButton_Background_Hover: [{ref: 'Neutral.100'}, {ref: 'Neutral.900'}], // var(--triplex-Pagination-PageButton_Background_Hover)
    PageButton_Background_Selected: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-Pagination-PageButton_Background_Selected)
    PageButton_BorderColor_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-Pagination-PageButton_BorderColor_Default)
    PageButton_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Pagination-PageButton_BorderColor_Focus)
    PageButton_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Pagination-PageButton_Color)
};
