import * as React from 'react';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

/**
 * Не происходит фокус при клике на button в сафари и в мозиле на маках.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
 *
 * Данная функция должна вызываться только синхронно. (Не будет работать в колбэках setState)
 * https://stackoverflow.com/questions/42089795/reactjs-cant-set-state-from-an-event-with-event-persist
 */
export const focusButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.currentTarget?.focus();
};

/**
 * Мапа энама типа кнопки на стилевой класс.
 */
export const mapButtonThemeToCssClass = {
    [EButtonTheme.GENERAL]: 'cssClass[buttonGeneral]',
    [EButtonTheme.SECONDARY]: 'cssClass[buttonSecondary]',
    [EButtonTheme.DANGER]: 'cssClass[buttonDanger]',
    [EButtonTheme.DOTS]: 'cssClass[buttonDots]',
    [EButtonTheme.LINK]: 'cssClass[buttonLink]',
};

/**
 * Мапа энама размера кнопки на стилевой класс.
 */
export const mapButtonSizeToCssClass = {
    [EButtonSize.MD]: 'cssClass[buttonMd]',
    [EButtonSize.SM]: 'cssClass[buttonSm]',
};
