import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Multiselect.
export const designTokensComponentsMultiselectKeys = ['Divider_Color'] as const;
// Тип, содержащий названия токенов компонента Multiselect.
export type TDesignTokensComponentsMultiselectKeys = (typeof designTokensComponentsMultiselectKeys)[number];
// Тип, содержащий названия токенов компонента Multiselect и их значения.
export type TDesignTokensComponentsMultiselectValue = Record<TDesignTokensComponentsMultiselectKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Multiselect и их значения в светлой и темной теме.
export type TDesignTokensComponentsMultiselectValues = Record<TDesignTokensComponentsMultiselectKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Multiselect.
export type TDesignTokensComponentsMultiselect = {Multiselect: TDesignTokensComponentsMultiselectValue};

// Токены компонента Multiselect в светлой и темной темах.
export const Multiselect_Tokens: TDesignTokensComponentsMultiselectValues = {
    Divider_Color: [{ref: 'Neutral.500'}, {ref: 'Basic.300'}], // var(--triplex-Multiselect-Divider_Color)
};
