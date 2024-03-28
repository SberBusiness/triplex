import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Calendar.
export const designTokensComponentsCalendarKeys = [
    'Background',
    'View_Header_Color',
    'View_Item_Background_Hover',
    'View_Item_Background_Selected_Default',
    'View_Item_Background_Selected_Hover',
    'View_Item_Background_Range',
    'View_Item_BorderColor_Default',
    'View_Item_BorderColor_Focus',
    'View_Item_Color_Default',
    'View_Item_Color_Disabled',
    'View_Item_Color_Muted',
    'View_Item_Color_Selected',
    'View_Item_Mark_Background',
] as const;
// Тип, содержащий названия токенов компонента Calendar.
export type TDesignTokensComponentsCalendarKeys = (typeof designTokensComponentsCalendarKeys)[number];
// Тип, содержащий названия токенов компонента Calendar и их значения.
export type TDesignTokensComponentsCalendarValue = Record<TDesignTokensComponentsCalendarKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Calendar и их значения в светлой и темной теме.
export type TDesignTokensComponentsCalendarValues = Record<TDesignTokensComponentsCalendarKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Calendar.
export type TDesignTokensComponentsCalendar = {Calendar: TDesignTokensComponentsCalendarValue};

// Токены компонента Calendar в светлой и темной темах.
export const Calendar_Tokens: TDesignTokensComponentsCalendarValues = {
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Calendar-Background)
    View_Header_Color: [{ref: 'Neutral.900'}, {ref: 'Neutral.900'}], // var(--triplex-Calendar-View_Header_Color)
    View_Item_Background_Hover: [{ref: 'Neutral.100'}, {ref: 'Basic.300'}], // var(--triplex-Calendar-View_Item_Background_Hover)
    View_Item_Background_Range: [{ref: 'Neutral.100'}, {ref: 'Basic.300'}], // var(--triplex-Calendar-View_Item_Background_Range)
    View_Item_Background_Selected_Default: [{ref: 'Primary.700'}, {ref: 'Primary.500'}], // var(--triplex-Calendar-View_Item_Background_Selected_Default)
    View_Item_Background_Selected_Hover: [{ref: 'Primary.500'}, {ref: 'Primary.900'}], // var(--triplex-Calendar-View_Item_Background_Selected_Hover)
    View_Item_BorderColor_Default: [{ref: 'Basic.0'}, {ref: 'Basic.0'}], // var(--triplex-Calendar-View_Item_BorderColor_Default)
    View_Item_BorderColor_Focus: [{ref: 'Accent.500'}, {ref: 'Accent.500'}], // var(--triplex-Calendar-View_Item_BorderColor_Focus)
    View_Item_Color_Default: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Calendar-View_Item_Color_Default)
    View_Item_Color_Disabled: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Calendar-View_Item_Color_Disabled)
    View_Item_Color_Muted: [{ref: 'Neutral.500'}, {ref: 'Neutral.900'}], // var(--triplex-Calendar-View_Item_Color_Muted)
    View_Item_Color_Selected: [{ref: 'Basic.100'}, {ref: 'Neutral.100'}], // var(--triplex-Calendar-View_Item_Color_Selected)
    View_Item_Mark_Background: [{ref: 'Neutral.700'}, {ref: 'Neutral.700'}], // var(--triplex-Calendar-View_Item_Mark_Background)
};
