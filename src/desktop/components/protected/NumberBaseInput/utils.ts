import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {AmountConst} from '@sberbusiness/triplex/desktop/common/consts/AmountConst';

/**
 * Вычисляем позицию каретки.
 *
 * @param {string} prevValueFormatted Прошлое отформатированное значение.
 * @param {string} newValueRaw Новое не отформатированное значение.
 * @param {number} fractionLength Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
 * @param {number} currentCaretPosition Позиция каретки в поле ввода.
 */
export const countCaret = (prevValueFormatted: string, newValueRaw: string, fractionLength: number, currentCaretPosition: number) => {
    const spacesInOldValue = (prevValueFormatted.match(/\s/g) || []).length;
    const spacesInNewValue = (formatAmount(newValueRaw, fractionLength).match(/\s/g) || []).length;
    let caretSpaceOffset = spacesInNewValue - spacesInOldValue;

    if (prevValueFormatted.length - newValueRaw.length > 1) {
        // Если было удалено больше одного символа. Делаем reset caretSpaceOffset.
        caretSpaceOffset = 0;
    } else if (newValueRaw.substr(0, 1) === AmountConst.GroupSeparator) {
        // Если впереди пробел (" 786 673") сдвигаем каретку.
        caretSpaceOffset++;
    }

    return currentCaretPosition + caretSpaceOffset;
};
