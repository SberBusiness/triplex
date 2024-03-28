import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Tooltip.
export const designTokensComponentsTooltipKeys = ['Background', 'Color'] as const;
// Тип, содержащий названия токенов компонента Tooltip.
export type TDesignTokensComponentsTooltipKeys = (typeof designTokensComponentsTooltipKeys)[number];
// Тип, содержащий названия токенов компонента Tooltip и их значения.
export type TDesignTokensComponentsTooltipValue = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tooltip и их значения в светлой и темной теме.
export type TDesignTokensComponentsTooltipValues = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tooltip.
export type TDesignTokensComponentsTooltip = {Tooltip: TDesignTokensComponentsTooltipValue};

// Токены компонента Tooltip в светлой и темной темах.
export const Tooltip_Tokens: TDesignTokensComponentsTooltipValues = {
    Background: [{ref: 'Basic.700'}, {ref: 'Neutral.300'}], // var(--triplex-Tooltip-Background)
    Color: [{ref: 'Basic.100'}, {ref: 'Basic.700'}], // var(--triplex-Tooltip-Color)
};
