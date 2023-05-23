/** Утилиты для работы со строками. */
export const StringUtils = {
    /** Считает количество пробелов в строке. */
    countWhitespaces: (str: string): number => (str.match(/[\s\u00A0]/g) ?? []).length,

    /** Считает количество чисел в строке. */
    countDigits: (str: string): number => (str.match(/\d/g) ?? []).length,

    /** Удаляет пробелы из строки. */
    removeSpaces: (str: string): string => str.replace(/\s+/g, ''),

    /**
     * Функция проверки валидности числа, если оно приходит как строка.
     * @param {string} value - Проверяемое число/строка.
     * @return {boolean} Валидное число или нет.
     */
    isNumber: (value: string): boolean => /^\d+([\.\,]\d*)?$/.test(value),
};
