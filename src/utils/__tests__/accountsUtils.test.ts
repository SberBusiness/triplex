import {decorate} from '@sberbusiness/triplex/utils/accountsUtils';
import {allure} from '@jest/unit/allure-report';

/** Ожидаемое значение, аргументы для получения этого значения. */
type TMapper = [string, string];

describe('accountUtils', () => {
    beforeEach(() => {
        allure.feature('accountUtils');
    });

    it('accountUtils правильно форматирует номер счёта', () => {
        // Массив соответствий: ожидаемый результат - значение, передаваемое в функцию
        const mapper: TMapper[] = [
            ['12345 678 9 0123 4567890', '12345678901234567890'],
            ['12345 678 9 0123 4567890', '12345.678.9.0123.4567890'],
        ];

        mapper.forEach((value) => {
            const [expected, tested] = value;
            const result = decorate(tested);
            expect(result).toBe(expected);
        });
    });
});
