import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Marker.
export const designTokensComponentsMarkerKeys = [
    'Background_Error',
    'Background_Success',
    'Background_Waiting',
    'Background_Warning',
] as const;
// Тип, содержащий названия токенов компонента Marker.
export type TDesignTokensComponentsMarkerKeys = (typeof designTokensComponentsMarkerKeys)[number];
// Тип, содержащий названия токенов компонента Marker и их значения.
export type TDesignTokensComponentsMarkerValue = Record<TDesignTokensComponentsMarkerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Marker и их значения в светлой и темной теме.
export type TDesignTokensComponentsMarkerValues = Record<TDesignTokensComponentsMarkerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Marker.
export type TDesignTokensComponentsMarker = {Marker: TDesignTokensComponentsMarkerValue};

// Токены компонента Marker в светлой и темной темах.
export const Marker_Tokens: TDesignTokensComponentsMarkerValues = {
    Background_Error: [{ref: 'Error.500'}, {ref: 'Error.500'}], // var(--triplex-Marker-Background_Error)
    Background_Success: [{ref: 'Primary.500'}, {ref: 'Primary.500'}], // var(--triplex-Marker-Background_Success)
    Background_Waiting: [{ref: 'Neutral.700'}, {ref: 'Neutral.700'}], // var(--triplex-Marker-Background_Waiting)
    Background_Warning: [{ref: 'Warning.700'}, {ref: 'Warning.700'}], // var(--triplex-Marker-Background_Warning)
};
