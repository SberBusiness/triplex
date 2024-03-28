import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента DropdownMobile.
export const designTokensComponentsDropdownMobileKeys = [
    'Backdrop',
    'Content_Background',
    'Footer_Background',
    'Header_Background',
] as const;
// Тип, содержащий названия токенов компонента DropdownMobile.
export type TDesignTokensComponentsDropdownMobileKeys = (typeof designTokensComponentsDropdownMobileKeys)[number];
// Тип, содержащий названия токенов компонента DropdownMobile и их значения.
export type TDesignTokensComponentsDropdownMobileValue = Record<TDesignTokensComponentsDropdownMobileKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента DropdownMobile и их значения в светлой и темной теме.
export type TDesignTokensComponentsDropdownMobileValues = Record<TDesignTokensComponentsDropdownMobileKeys, TDesignTokenValues>;
// Тип локальных токенов компонента DropdownMobile.
export type TDesignTokensComponentsDropdownMobile = {DropdownMobile: TDesignTokensComponentsDropdownMobileValue};

// Токены компонента DropdownMobile в светлой и темной темах.
export const DropdownMobile_Tokens: TDesignTokensComponentsDropdownMobileValues = {
    Backdrop: [{value: '#343434'}, {value: '#343434'}], // var(--triplex-DropdownMobile-Backdrop)
    Content_Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-DropdownMobile-Content_Background)
    Footer_Background: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-DropdownMobile-Footer_Background)
    Header_Background: [{ref: 'Neutral.100'}, {ref: 'Basic.700'}], // var(--triplex-DropdownMobile-Header_Background)
};
