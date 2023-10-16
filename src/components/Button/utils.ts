import React from 'react';

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
