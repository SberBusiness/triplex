import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента TableBasic.
export const designTokensComponentsTableBasicKeys = [
    'Background_Hover',
    'Background_Selected',
    'Color',
    'FilterPanel_Background',
    'Header_Background',

    'PaginationBasic_Color',
    'PaginationBasic_Icon_Circle_Fill_Default',
    'PaginationBasic_Icon_Circle_Fill_Disabled',
    'PaginationBasic_Icon_Circle_Fill_Hover',
    'PaginationBasic_Icon_Path_Fill_Default',
    'PaginationBasic_Icon_Path_Fill_Disabled',
    'PaginationBasic_Icon_Path_Fill_Hover',

    'TableFooter_Background',
    'TableFooter_Highlight',
] as const;
// Тип, содержащий названия токенов компонента TableBasic.
export type TDesignTokensComponentsTableBasicKeys = (typeof designTokensComponentsTableBasicKeys)[number];
// Тип, содержащий названия токенов компонента TableBasic и их значения.
export type TDesignTokensComponentsTableBasicValue = Record<TDesignTokensComponentsTableBasicKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TableBasic и их значения в светлой и темной теме.
export type TDesignTokensComponentsTableBasicValues = Record<TDesignTokensComponentsTableBasicKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TableBasic.
export type TDesignTokensComponentsTableBasic = {TableBasic: TDesignTokensComponentsTableBasicValue};

// Токены компонента TableBasic в светлой и темной темах.
export const TableBasic_Tokens: TDesignTokensComponentsTableBasicValues = {
    Background_Hover: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-TableBasic-Background_Hover)
    Background_Selected: [{ref: 'Neutral.300'}, {ref: 'Basic.300'}], // var(--triplex-TableBasic-Background_Selected)
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-TableBasic-Color)
    FilterPanel_Background: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-TableBasic-FilterPanel_Background)
    Header_Background: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-TableBasic-Header_Background)

    PaginationBasic_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-TableBasic-PaginationBasic_Color)
    PaginationBasic_Icon_Circle_Fill_Default: [{ref: 'Neutral.100'}, {ref: 'Neutral.700'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Circle_Fill_Default)
    PaginationBasic_Icon_Circle_Fill_Disabled: [{ref: 'Neutral.100'}, {ref: 'Basic.500'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Circle_Fill_Default)
    PaginationBasic_Icon_Circle_Fill_Hover: [{ref: 'Neutral.300'}, {ref: 'Neutral.900'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Circle_Fill_Hover)
    PaginationBasic_Icon_Path_Fill_Default: [{ref: 'Basic.300'}, {ref: 'Basic.700'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Path_Fill_Default)
    PaginationBasic_Icon_Path_Fill_Disabled: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Path_Fill_Default)
    PaginationBasic_Icon_Path_Fill_Hover: [{ref: 'Basic.700'}, {ref: 'Basic.700'}], // var(--triplex-TableBasic-PaginationBasic_Icon_Path_Fill_Hover)

    TableFooter_Background: [{ref: 'Neutral.300'}, {ref: 'Basic.500'}], // var(--triplex-TableBasic-TableFooter_Background)
    TableFooter_Highlight: [{value: 'linear-gradient(transparent, #FFFFFF)'}, {value: 'linear-gradient(transparent, #181819)'}], // var(--triplex-TableBasic-TableFooter_Highlight)
};
