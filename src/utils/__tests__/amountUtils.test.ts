import {formatAmount, amountComparator} from '../amountUtils';
import {AmountConst} from '../../consts/AmountConst';

/** Ожидаемое значение, аргументы для получения этого значения. */
type TMapper = [string, string, (number | null)?, boolean?, boolean?];

describe('amountUtils', () => {
    beforeEach(() => {
        allure.feature('amountUtils');
    });

    it('formatAmount правильно форматирует сумму', () => {
        // Массив соответствий: результат - параметры функции
        const mapper: TMapper[] = [
            ['-98 765 432,10', '-98765432.10'],
            ['-98 765 432,00', '-98765432'],
            ['98 765 432,10', '9 8 7 6 5 4 3 2.10'],
            ['98 765 432', '98765432', null, true, false],
            ['+98 765 432,12', '+98765432.12'],
            ['0,12', '.12'],
            ['1 001,12000', '1001.12', 5, true, true],
            ['1001,12345', '1001.123456', 5, false, false],
            ['1 001', '1001,123456', 0, true],
            ['100 500', '100500', 0],
        ];

        mapper.forEach((value) => {
            const [expected, ...args] = value;
            const result = formatAmount.apply(null, args);
            expect(result).toBe(expected.split(' ').join(AmountConst.GroupSeparator));
        });
    });

    it('число a меньше числа b', () => {
        const a = '22,1';
        const b = '22.2';

        const result = amountComparator(a, b) < 0;

        expect(result).toBe(true);
    });

    it('число a эквивалентно числу b', () => {
        const a = '33,0000';
        const b = String(33);

        const result = amountComparator(a, b) === 0;

        expect(result).toBe(true);
    });

    it('число a больше числа b', () => {
        const a = '5432,1';
        const b = '5432.0000';

        const result = amountComparator(a, b) > 0;

        expect(result).toBe(true);
    });
});
