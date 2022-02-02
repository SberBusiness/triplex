/** Утилиты для работы со строками. */
export const StringUtils = {
    /** Удаляет пробелы из строки. */
    removeSpaces: (str: string): string => str.replace(/\s+/g, ''),

    /**
     * Функция проверки валидности числа, если оно приходит как строка.
     * @param {string} value - Проверяемое число/строка.
     * @return {boolean} Валидное число или нет.
     */
    isNumber: (value: string): boolean => /^\d+([\.\,]\d*)?$/.test(value),
};
