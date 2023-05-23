import * as React from 'react';
import {AmountConst} from '@sberbusiness/triplex/desktop/common/consts/AmountConst';
import {StringUtils} from '@sberbusiness/triplex/desktop/utils/stringUtils';
import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {getCaretPosition} from '@sberbusiness/triplex/desktop/utils/inputUtils';

/** Возвращаемая модель данных. */
export interface IAmountBaseChangeResult {
    /** Отформатированное значение. */
    formattedValue: string;
    /** Позиция каретки. */
    caret: number;
    /** Предыдущая позиция каретки. */
    prevCaret: number;
}

/** Логика изменения значения и позиции каретки у поля Amount. */
export class NumberBaseChangeManager {
    /**
     * Обработчик изменения значения.
     * @param event Событие изменения.
     * @param prevValue Прошлое отформатированное значение.
     * @param fractionLength Количество знаков в дробной части.
     * @param maxLength Общее количество знаков.
     */
    public static handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        prevValue: string,
        fractionLength: number,
        maxLength: number
    ): IAmountBaseChangeResult {
        let value = event.target.value;
        let caret = getCaretPosition(event.target);

        const diffLength = prevValue.length - value.length;
        // Удалён один пробел.
        if (diffLength == 1 && prevValue[caret] == AmountConst.GroupSeparator) {
            return {formattedValue: prevValue, caret: caret, prevCaret: caret};
        }

        if (caret > 0) {
            const {string, caretShift} = NumberBaseChangeManager.filteringStage(value, caret, fractionLength, maxLength);
            value = string;
            caret += caretShift;
        }

        // Отсутствует значение.
        if (value == '') {
            return {formattedValue: '', caret: 0, prevCaret: diffLength};
        }

        if (fractionLength > 0) {
            value = NumberBaseChangeManager.restoringStage(value, caret, fractionLength);
        }

        const separatorIndex = value.indexOf(AmountConst.DecimalSeparator);
        // Удалены все ненулевые значения числа с дробной частью.
        if (separatorIndex == 0 && !/[1-9]/g.test(value)) {
            return {formattedValue: '', caret: 0, prevCaret: diffLength};
        }

        const {string: formattedValue, caretShift} = NumberBaseChangeManager.formattingStage(value, caret, fractionLength, separatorIndex);

        return {
            formattedValue,
            caret: caret + caretShift,
            prevCaret: caret + (formattedValue == prevValue ? caretShift : diffLength),
        };
    }

    /** Этап очищения значения от невалидных и неуместных символов. */
    private static filteringStage = (value: string, caret: number, fractionLength: number, maxLength: number) => {
        const [beforeCaret, afterCaret] = [value.substring(0, caret), value.substring(caret)];
        // Определяем индекс десятичного разделителя, необходимо для определения логики фильтрации.
        const separatorIndex = Math.max(
            value.lastIndexOf(AmountConst.DecimalSeparator),
            value.lastIndexOf(AmountConst.DecimalSeparatorCalc)
        );

        // Максимальное количество цифр, которое сможет содержать отфильтрованный фрагмент.
        let digitsLimit: number;
        // Может ли отфильтрованный фрагмент содержать десятичный разделитель.
        let separatorAllowed: boolean;

        // Если значение является целым числом.
        if (fractionLength == 0) {
            digitsLimit = maxLength - StringUtils.countDigits(afterCaret);
            separatorAllowed = false;
        }
        // Если отсутствует десятичный разделитель.
        else if (separatorIndex == -1) {
            digitsLimit = maxLength - fractionLength - AmountConst.DecimalSeparator.length;
            separatorAllowed = false;
        }
        // Если каретка перед числом целой части.
        else if (caret < separatorIndex) {
            digitsLimit = maxLength - StringUtils.countDigits(afterCaret) - AmountConst.DecimalSeparator.length;
            separatorAllowed = false;
        }
        // Если каретка перед числом дробной части.
        else if (caret > separatorIndex) {
            digitsLimit = maxLength - AmountConst.DecimalSeparator.length;
            separatorAllowed = true;
        }
        // Если каретка перед десятичным разделителем.
        else {
            digitsLimit = maxLength - StringUtils.countDigits(afterCaret) - AmountConst.DecimalSeparator.length;
            separatorAllowed = true;
        }

        const fragment = NumberBaseChangeManager.getFilteredFragment(beforeCaret, digitsLimit, separatorAllowed, !!afterCaret.length);

        return {string: fragment + afterCaret, caretShift: fragment.length - beforeCaret.length};
    };

    /** Функция, возвращающая отфильтрованную часть значения (до каретки). */
    private static getFilteredFragment = (fragment: string, digitsLimit: number, separatorAllowed: boolean, partial: boolean) => {
        const isDigit = (char: string) => char >= '0' && char <= '9';
        const isDecimalSeparator = (char: string) => char == AmountConst.DecimalSeparator || char == AmountConst.DecimalSeparatorCalc;

        let string = '';

        for (let i = 0, len = fragment.length, count = 0; i < len; i++) {
            if (isDigit(fragment[i])) {
                if (count < digitsLimit) {
                    string += fragment[i];
                    count++;
                }
            } else if (isDecimalSeparator(fragment[i])) {
                if (separatorAllowed && string.indexOf(AmountConst.DecimalSeparator) == -1) {
                    string += AmountConst.DecimalSeparator;
                }
            }
        }

        // Убираем ведущие нули.
        string = string.replace(/^0+(\d)/, '$1');

        // Проверяем, можно ли пропустить введённый ноль.
        if (string == '0' && !separatorAllowed && partial) {
            string = '';
        }

        return string;
    };

    /** Этап восстановления значения, возвращаем удаленные символы. */
    private static restoringStage = (value: string, caret: number, fractionLength: number) => {
        let string = value.substring(0, caret);

        const separatorIndex = value.indexOf(AmountConst.DecimalSeparator);
        // Если был удален десятичный разделитель, добавляем его.
        if (separatorIndex == -1) {
            string += AmountConst.DecimalSeparator;
        }

        const fractionalPart = separatorIndex !== -1 ? value.substring(separatorIndex + 1) : value.substring(caret);
        // Если в дробную часть числа добавилось значение.
        if (fractionalPart.length > fractionLength) {
            caret += fractionalPart.length - fractionLength;
        }
        // Если есть необходимость в пагинации нулями.
        else if (fractionalPart.length < fractionLength) {
            string += Array(fractionLength - fractionalPart.length + 1).join('0');
        }

        string += value.substring(caret);

        return string;
    };

    /** Этап форматирования значения к нужному виду. */
    private static formattingStage = (value: string, caret: number, fractionLength: number, separatorIndex: number) => {
        let string = '';
        let caretShift = 0;

        string = formatAmount(value, fractionLength);

        if (caret > 0) {
            caretShift = StringUtils.countWhitespaces(string) - StringUtils.countWhitespaces(value);
        }
        // Удалена целая часть числа.
        else if (separatorIndex == 0) {
            caretShift = 1;
        }

        return {string, caretShift};
    };
}
