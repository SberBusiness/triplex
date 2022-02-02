import {amountComparator, calculateAmountMaxValue, formatAmount} from '@sbbol/web-library/desktop/utils/amountUtils';
import {AmountConst} from '@sbbol/web-library/desktop/common/consts/AmountConst';

/** Формат поля ввода суммы. */
const amountRegExp = new RegExp(`^([1-9][0-9]*|[0-9])(${AmountConst.DecimalSeparator}[0-9]*)?$`);

/**
 * Проверка на максимальное значение.
 *
 * @param {string} value Значение.
 * @param {string | number | undefined} max Максимальное значение числа в поле.
 * @param {number} maxLength Максимальная длина поля.
 * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
 */
const checkMaxValue = (value: string, max: string | number | undefined, maxLength: number, fractionLength: number): boolean => {
    if (!amountRegExp.test(value)) {
        return false;
    }

    const resultMaxValue = getMaxValue(max, maxLength, fractionLength);
    if (!resultMaxValue) {
        return false;
    }

    return amountComparator(value, resultMaxValue) <= 0;
};

/**
 * Вычисляет максимальное значение для поля суммы.
 *
 * @param {string | number | undefined} max Максимальное значение числа в поле.
 * @param {number} maxLength Максимальная длина поля.
 * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
 * */
const getMaxValue = (max: string | number | undefined, maxLength: number, fractionLength: number): string | undefined => {
    let maxValue: number;
    if (typeof max === 'string') {
        maxValue = Number.parseFloat(max);
    } else if (typeof max === 'number') {
        maxValue = max;
    }
    if (!Number.isInteger(maxValue!) && maxLength !== undefined) {
        return calculateAmountMaxValue(maxLength, fractionLength);
    } else if (Number.isInteger(max) && maxLength === undefined) {
        return String(max);
    } else {
        const maxAmountValueByLength = calculateAmountMaxValue(maxLength, fractionLength);
        const maxAsString = String(max);
        // проверить входит ли максимальное число в диапазон ограниченный длиной
        if (amountComparator(maxAmountValueByLength as string, maxAsString) < 0) {
            // если нет, ограничить максимальной длиной
            return maxAmountValueByLength;
        } else {
            // если да - максимальным значением
            return maxAsString;
        }
    }
};

/**
 * Вычисляем позицию каретки. (скопирована из СББОЛ)
 *
 * @param {string} prevValueFormatted Прошлое отформатированное значение.
 * @param {string} newValueRaw Новое не отформатированное значение.
 * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
 * @param {number} currentCaretPosition Позиция каретки в поле ввода.
 */
const countCaret = (prevValueFormatted: string, newValueRaw: string, fractionLength: number, currentCaretPosition: number): number => {
    const spacesInOldValue = (prevValueFormatted.match(/\s/g) || []).length;
    const spacesInNewValue = (formatAmount(newValueRaw, fractionLength).match(/\s/g) || []).length;
    let caretSpaceOffset = spacesInNewValue - spacesInOldValue;

    if (prevValueFormatted.length - newValueRaw.length > 1) {
        // Если было удалено больше одного символа. Делаем reset caretSpaceOffset.
        caretSpaceOffset = 0;
    } else if (newValueRaw.substr(0, 1) === AmountConst.GroupsSeparator) {
        // Если впереди пробел (" 786 673") сдвигаем каретку.
        caretSpaceOffset++;
    }

    return currentCaretPosition + caretSpaceOffset;
};

export {checkMaxValue, countCaret};
