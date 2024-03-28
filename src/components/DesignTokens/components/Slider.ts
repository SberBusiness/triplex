import {TDesignTokenValue} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Slider.
export const designTokensComponentsSliderKeys = [
    'Dot_Background_Default',
    'Dot_Background_Disabled',
    'Dot_Background_Hover',
    'Dot_Inner_Background',
    'Mark_Color_Default',
    'Mark_Color_Active',
    'Mark_Dot_Background_Default',
    'Mark_Dot_Background_Selected',
    'Mark_Dot_Background_Selected_Disabled',
    'Rail_Background',
    'Tooltip_Background',
    'Tooltip_Color',
    'Track_Background_Default',
    'Track_Background_Disabled',
    'Track_Background_Hover',
] as const;
// Тип, содержащий названия токенов компонента Slider.
export type TDesignTokensComponentsSliderKeys = (typeof designTokensComponentsSliderKeys)[number];
// Тип, содержащий названия токенов компонента Slider и их значения.
export type TDesignTokensComponentsSliderValue = Record<TDesignTokensComponentsSliderKeys, TDesignTokenValue>;
// Тип локальных токенов компонента Slider.
export type TDesignTokensComponentsSlider = {Slider: TDesignTokensComponentsSliderValue};

// Токены компонента Slider в теме по-умолчанию.
export const Slider_LM: TDesignTokensComponentsSliderValue = {
    Dot_Background_Default: {
        ref: 'Primary.700', // var(--triplex-Slider_Dot_Background_Default)
    },
    Dot_Background_Disabled: {
        ref: 'Neutral.700', // var(--triplex-Slider_Dot_Background_Disabled)
    },
    Dot_Background_Hover: {
        ref: 'Primary.900', // var(--triplex-Slider_Dot_Background_Hover)
    },
    Dot_Inner_Background: {
        ref: 'Basic.100', // var(--triplex-Slider_Dot_Inner_Background)
    },
    Mark_Color_Active: {
        ref: 'Basic.700', // var(--triplex-Slider-Mark_Color_Active)
    },
    Mark_Color_Default: {
        ref: 'Neutral.700', // var(--triplex-Slider-Mark_Color_Default)
    },
    Mark_Dot_Background_Default: {
        ref: 'Neutral.500', // var(--triplex-Slider-Mark_Dot_Background_Default)
    },
    Mark_Dot_Background_Selected: {
        ref: 'Primary.700', // var(--triplex-Slider-Mark_Dot_Background_Selected)
    },
    Mark_Dot_Background_Selected_Disabled: {
        ref: 'Neutral.700', // var(--triplex-Slider-Mark_Dot_Background_Selected_Disabled)
    },
    Rail_Background: {
        ref: 'Neutral.500', // var(--triplex-Slider-Rail_Background)
    },
    Tooltip_Background: {
        ref: 'Basic.700', // var(--triplex-Slider-Tooltip_Background)
    },
    Tooltip_Color: {
        ref: 'Basic.100', // var(--triplex-Slider-Tooltip_Color)
    },
    Track_Background_Default: {
        ref: 'Primary.700', // var(--triplex-Slider-Track_Background_Default)
    },
    Track_Background_Disabled: {
        ref: 'Neutral.700', // var(--triplex-Slider-Track_Background_Disabled)
    },
    Track_Background_Hover: {
        ref: 'Primary.900', // var(--triplex-Slider-Track_Background_Hover)
    },
};

// Токены компонента Slider в темной теме.
export const Slider_DM: TDesignTokensComponentsSliderValue = {
    Dot_Background_Default: {
        ref: 'Primary.500', // var(--triplex-Slider_Dot_Background_Default)
    },
    Dot_Background_Disabled: {
        ref: 'Neutral.900', // var(--triplex-Slider_Dot_Background_Disabled)
    },
    Dot_Background_Hover: {
        ref: 'Primary.700', // var(--triplex-Slider_Dot_Background_Hover)
    },
    Dot_Inner_Background: {
        ref: 'Basic.700', // var(--triplex-Slider_Dot_Inner_Background)
    },
    Mark_Color_Active: {
        ref: 'Neutral.100', // var(--triplex-Slider-Mark_Color_Active)
    },
    Mark_Color_Default: {
        ref: 'Neutral.900', // var(--triplex-Slider-Mark_Color_Default)
    },
    Mark_Dot_Background_Default: {
        ref: 'Basic.300', // var(--triplex-Slider-Mark_Dot_Background_Default)
    },
    Mark_Dot_Background_Selected: {
        ref: 'Primary.500', // var(--triplex-Slider-Mark_Dot_Background_Selected)
    },
    Mark_Dot_Background_Selected_Disabled: {
        ref: 'Neutral.900', // var(--triplex-Slider-Mark_Dot_Background_Selected_Disabled)
    },
    Rail_Background: {
        ref: 'Basic.300', // var(--triplex-Slider-Rail_Background)
    },
    Tooltip_Background: {
        ref: 'Neutral.300', // var(--triplex-Slider-Tooltip_Background)
    },
    Tooltip_Color: {
        ref: 'Basic.700', // var(--triplex-Slider-Tooltip_Color)
    },
    Track_Background_Default: {
        ref: 'Primary.500', // var(--triplex-Slider-Track_Background_Default)
    },
    Track_Background_Disabled: {
        ref: 'Neutral.900', // var(--triplex-Slider-Track_Background_Disabled)
    },
    Track_Background_Hover: {
        ref: 'Primary.700', // var(--triplex-Slider-Track_Background_Hover)
    },
};
