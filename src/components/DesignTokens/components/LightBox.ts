import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента LightBox.
export const designTokensComponentsLightBoxKeys = ['Controls_Background'] as const;
// Тип, содержащий названия токенов компонента LightBox.
export type TDesignTokensComponentsLightBoxKeys = (typeof designTokensComponentsLightBoxKeys)[number];
// Тип, содержащий названия токенов компонента LightBox и их значения.
export type TDesignTokensComponentsLightBoxValue = Record<TDesignTokensComponentsLightBoxKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента LightBox и их значения в светлой и темной теме.
export type TDesignTokensComponentsLightBoxValues = Record<TDesignTokensComponentsLightBoxKeys, TDesignTokenValues>;
// Тип локальных токенов компонента LightBox.
export type TDesignTokensComponentsLightBox = {LightBox: TDesignTokensComponentsLightBoxValue};

// Токены компонента LightBox в светлой и темной темах.
export const LightBox_Tokens: TDesignTokensComponentsLightBoxValues = {
    Controls_Background: [{ref: 'Basic.300'}, {ref: 'Basic.500'}], // var(--triplex-LightBox-Controls_Background)
};
