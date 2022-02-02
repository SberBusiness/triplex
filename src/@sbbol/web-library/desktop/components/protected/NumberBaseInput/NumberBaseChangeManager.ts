//TODO подумать, как можно написать проще, но повысить иммутабельность.
import {AmountConst} from '@sbbol/web-library/desktop/common/consts/AmountConst';
import {formatAmount} from '@sbbol/web-library/desktop/utils/amountUtils';
import {getCaretPosition} from '@sbbol/web-library/desktop/utils/inputUtils';
import {EVENT_KEYS} from '@sbbol/web-library/desktop/utils/keyboard';
import {StringUtils} from '@sbbol/web-library/desktop/utils/stringUtils';
import * as React from 'react';
import {checkMaxValue, countCaret} from './utils';

/** Символ разделителя (он же пробел). */
const spaceChar = ' ';

/**
 * Возвращаемая модель данных.
 *
 * @param {string} formattedValue Отформатированное значение.
 * @param {number} caret Позиция каретки в поле ввода.
 */
export interface IAmountBaseChangeResult {
    formattedValue: string;
    caret: number;
}

/** Логика изменения значения и позиции каретки у поля Amount. */
export class NumberBaseChangeManager {
    /**
     * Обработчик onChange input-а.
     * @param {React.ChangeEvent<HTMLInputElement>} e Событие.
     * @param {string} prevValueFormatted Прошлое отформатированное значение.
     * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
     * @param {string | number | undefined} max Максимальное значение числа в поле.
     * @param {number} maxLength Максимальная длина поля.
     * @param {string} pressedButton Нажатая клавиша на клавиатуре.
     */
    static handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        prevValueFormatted: string,
        fractionLength: number,
        max: string | number | undefined,
        maxLength: number,
        pressedButton: string
    ): IAmountBaseChangeResult => {
        const field = e.target;
        const newValueRaw = field?.value;
        const currentCaretPosition = getCaretPosition(field);
        const result: IAmountBaseChangeResult = {formattedValue: prevValueFormatted, caret: currentCaretPosition};
        const newValueFormatted = formatAmount(newValueRaw, fractionLength);
        const newValueFormattedWithoutSpaces = StringUtils.removeSpaces(newValueFormatted);
        const fieldValueWithoutSpaces = StringUtils.removeSpaces(newValueRaw);

        // проверки
        const isAllNumberZero = fieldValueWithoutSpaces.replace(/^0+,0+/g, '').length === 0;
        const isSameValue = prevValueFormatted === newValueFormatted;
        const isBackspaceKeyDown = EVENT_KEYS.BACKSPACE.indexOf(pressedButton) !== -1;
        const isDeleteKeyDown = EVENT_KEYS.DELETE.indexOf(pressedButton) !== -1;
        const isSpaceKeyDown = pressedButton === spaceChar;
        const isSeparatorKeyDown = Boolean(pressedButton.match(/[.,]|Decimal/g));
        const isNumber = StringUtils.isNumber(fieldValueWithoutSpaces);
        const isMaxNumberReached = !checkMaxValue(newValueFormattedWithoutSpaces, max, maxLength, fractionLength);

        if (isBackspaceKeyDown || isDeleteKeyDown) {
            return NumberBaseChangeManager.pressedRemoveButton(
                newValueRaw,
                prevValueFormatted,
                fractionLength,
                isBackspaceKeyDown,
                isDeleteKeyDown,
                currentCaretPosition
            );
        } else if (isSeparatorKeyDown) {
            result.caret = prevValueFormatted.indexOf(AmountConst.DecimalSeparator) + AmountConst.DecimalSeparator.length;
            return result;
        } else if (isSameValue && isAllNumberZero) {
            return result;
        } else if (isSpaceKeyDown || !isNumber || isMaxNumberReached || isMaxNumberReached || isSameValue) {
            result.caret = currentCaretPosition - 1;
            return result;
        } else {
            return NumberBaseChangeManager.defaultChange(prevValueFormatted, newValueFormatted, fractionLength, currentCaretPosition);
        }
    };

    /**
     * Обработчик нажатия клавиш BACKSPACE и DELETE.
     *
     * @param {string} newValueRaw Новое не отформатированное значение.
     * @param {string} prevValueFormatted Прошлое отформатированное значение.
     * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
     * @param {boolean} isBackspaceKeyDown Была нажата клавиша Backspace.
     * @param {boolean} isDeleteKeyDown Была нажата клавиша Delete.
     * @param {number} currentCaretPosition Позиция каретки в поле ввода.
     */
    private static pressedRemoveButton = (
        newValueRaw: string,
        prevValueFormatted: string,
        fractionLength: number,
        isBackspaceKeyDown: boolean,
        isDeleteKeyDown: boolean,
        currentCaretPosition: number
    ): IAmountBaseChangeResult => {
        const isDeletedWhitespace = newValueRaw && (prevValueFormatted.match(/\s/g) || []).length > (newValueRaw.match(/\s/g) || []).length;
        const isDeletedSeparator =
            prevValueFormatted.indexOf(AmountConst.DecimalSeparator) > 0 && newValueRaw.indexOf(AmountConst.DecimalSeparator) === -1;
        const isDeletedSeparatorAndNeedShiftCaretLeft = isDeletedSeparator && fractionLength !== 0 && Boolean(newValueRaw);
        const isDeletedLastInteger = newValueRaw.indexOf(AmountConst.DecimalSeparator) === 0; // Если было удалено единственное число целой части.

        const fractionRaw = prevValueFormatted.split(',')[1] || '';
        const newCaret = isDeletedSeparatorAndNeedShiftCaretLeft
            ? currentCaretPosition
            : countCaret(prevValueFormatted, newValueRaw, fractionLength, currentCaretPosition);
        let localNewValueRaw = newValueRaw;
        let shiftCaret = 0;

        if (isDeletedLastInteger) {
            localNewValueRaw = parseInt(fractionRaw) > 0 ? '0,' + fractionRaw : '';
            shiftCaret = 0;
        } else if (isDeletedSeparatorAndNeedShiftCaretLeft) {
            localNewValueRaw = prevValueFormatted;
            shiftCaret = isDeleteKeyDown ? 1 : 0;
        } else if (isDeletedWhitespace) {
            // Удаляем вместе с пробелом предыдущий или следующий символ.
            localNewValueRaw = newValueRaw
                .split(AmountConst.GroupsSeparator)
                .map((item) => {
                    const value = item.split(AmountConst.DecimalSeparator);
                    let firstPart: string;

                    if (value[0].length <= 3) {
                        firstPart = value[0];
                    } else {
                        firstPart = isBackspaceKeyDown
                            ? value[0].substr(0, value[0].length - 4) + value[0].substr(-3)
                            : value[0].substr(0, value[0].length - 3) + value[0].substr(-2);
                    }

                    return firstPart + (value[1] ? `${AmountConst.DecimalSeparator}${value[1]}` : '');
                })
                .join(AmountConst.GroupsSeparator);

            if (newCaret > 0 && isBackspaceKeyDown) {
                shiftCaret = -1;
            }
        }

        const newFormattedValue = formatAmount(localNewValueRaw, fractionLength);
        return {formattedValue: newFormattedValue, caret: newCaret + shiftCaret};
    };

    /**
     * Стандартный обработчик ввода нового числа.
     * @param {string} prevValueFormatted Прошлое отформатированное значение.
     * @param {string} newValueFormatted Новое отформатированное значение.
     * @param {number} fractionLength Количество знаков после разделителя в сумме.
     * @param {number} caret Позиция каретки в поле ввода.
     */
    private static defaultChange = (
        prevValueFormatted: string,
        newValueFormatted: string,
        fractionLength: number,
        caret: number
    ): IAmountBaseChangeResult => {
        let caretSpaceOffset = (newValueFormatted.match(/\s/g) || []).length - (prevValueFormatted.match(/\s/g) || []).length;
        let caretZeroOffset = 0;

        // Если было удалено больше одного символа. Делаем reset caretSpaceOffset.
        if (prevValueFormatted?.length - newValueFormatted.length > 1) {
            caretSpaceOffset = 0;
        }

        // Сдвигаем каретку, если первой цифрой оказался 0.
        if ((prevValueFormatted?.[0] === '0' || newValueFormatted[0] === '0') && newValueFormatted[0] !== '0' && caret > 1) {
            caretZeroOffset = -1;
        }

        const newCaret = caret > -1 && caretSpaceOffset > -1 ? caret + caretSpaceOffset + caretZeroOffset : -1;
        return {formattedValue: newValueFormatted, caret: newCaret};
    };
}
