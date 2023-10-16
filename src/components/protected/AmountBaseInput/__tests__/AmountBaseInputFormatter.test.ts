import {allure} from '@jest/unit/allure-report';
import {AmountBaseInputFormatter} from '../AmountBaseInputFormatter';

describe('AmountBaseInputFormatter', () => {
    const commonTests = [
        ['', ''],
    ];

    beforeEach(() => {
        allure.feature('AmountBaseInputFormatter');
    });

    it('formats value as integer correctly', () => {
        const tests = [
            ...commonTests,
            ['0', '0'],
            ['123', '123'],
            ['123 456', '123456'],
            ['123 456 789', '123456789'],
            ['1 234 567 890', '1234567890'],
        ];

        tests.forEach((test) => {
            const parser = new AmountBaseInputFormatter(24, 0);
            const [expected, value] = test;

            parser.apply(value);

            expect(parser.getValue()).toBe(expected);
        });
    });

    it('formats value as decimal correctly', () => {
        const tests = [
            ...commonTests,
            ['123,00', '123.00'],
            ['123 456,00', '123456.00'],
            ['123 456 789,00', '123456789.00'],
            ['1 234 567 890,00', '1234567890.00'],
        ];

        tests.forEach((test) => {
            const parser = new AmountBaseInputFormatter(24, 2);
            const [expected, value] = test;

            parser.apply(value);

            expect(parser.getValue()).toBe(expected);
        });
    });
});
