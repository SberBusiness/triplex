/**
 * Убирает из массива все пустые значения.
 */
export const compact = <T>(array: Array<T | null | undefined | false | '' | 0> | null | undefined): T[] => {
    let resIndex = 0;
    const result: T[] = [];

    if (array === null || array === undefined) {
        return result;
    }

    for (const value of array) {
        if (value) {
            result[resIndex++] = value;
        }
    }
    return result;
};
