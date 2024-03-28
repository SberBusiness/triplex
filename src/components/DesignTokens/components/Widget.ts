import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Widget.
export const designTokensComponentsWidgetKeys = ['Background', 'Caret_Color', 'Title_Color'] as const;
// Тип, содержащий названия токенов компонента Widget.
export type TDesignTokensComponentsWidgetKeys = (typeof designTokensComponentsWidgetKeys)[number];
// Тип, содержащий названия токенов компонента Widget и их значения.
export type TDesignTokensComponentsWidgetValue = Record<TDesignTokensComponentsWidgetKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Widget и их значения в светлой и темной теме.
export type TDesignTokensComponentsWidgetValues = Record<TDesignTokensComponentsWidgetKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Widget.
export type TDesignTokensComponentsWidget = {Widget: TDesignTokensComponentsWidgetValue};

// Токены компонента Widget в светлой и темной темах.
export const Widget_Tokens: TDesignTokensComponentsWidgetValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Widget-Background)
    Caret_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.700'}], // var(--triplex-Widget-Caret_Color)
    Title_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Widget-Title_Color)
};
