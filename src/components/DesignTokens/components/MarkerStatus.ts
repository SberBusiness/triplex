import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента MarkerStatus.
export const designTokensComponentsMarkerStatusKeys = ['Desc_Color', 'Text_Color'] as const;
// Тип, содержащий названия токенов компонента MarkerStatus.
export type TDesignTokensComponentsMarkerStatusKeys = (typeof designTokensComponentsMarkerStatusKeys)[number];
// Тип, содержащий названия токенов компонента MarkerStatus и их значения.
export type TDesignTokensComponentsMarkerStatusValue = Record<TDesignTokensComponentsMarkerStatusKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента MarkerStatus и их значения в светлой и темной теме.
export type TDesignTokensComponentsMarkerStatusValues = Record<TDesignTokensComponentsMarkerStatusKeys, TDesignTokenValues>;
// Тип локальных токенов компонента MarkerStatus.
export type TDesignTokensComponentsMarkerStatus = {MarkerStatus: TDesignTokensComponentsMarkerStatusValue};

// Токены компонента MarkerStatus в светлой и темной темах.
export const MarkerStatus_Tokens: TDesignTokensComponentsMarkerStatusValues = {
    Desc_Color: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-MarkerStatus-Desc_Color)
    Text_Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-MarkerStatus-Text_Color)
};
