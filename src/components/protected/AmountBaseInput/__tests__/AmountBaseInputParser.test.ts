import {AmountBaseInputParser} from '../AmountBaseInputParser';

describe('AmountBaseInputParser', () => {
    const commonTests = [
        ['', ''],
        ['', ' '],
        ['', '.'],
        ['', ','],
        ['', 'test'],
    ];

    beforeEach(() => {
        allure.feature('AmountBaseInputParser');
    });

    it('parses value as integer correctly', () => {
        const tests = [
            ...commonTests,
            ['0', '0'],
            ['0', '00'],
            ['0', '0x0'],
            ['0', ' 0 '],
            ['123', '123'],
            ['123', '0123'],
            ['123', '0x123'],
            ['123', ' 123 '],
        ];

        tests.forEach((test) => {
            const parser = new AmountBaseInputParser(24, 0);
            const [expected, value] = test;

            parser.apply(value, value.length, '');

            expect(parser.getValue()).toBe(expected);
        });
    });

    it('parses value as decimal correctly', () => {
        const tests = [
            ...commonTests,
            ['0.00', '0'],
            ['0.00', '0.00'],
            ['0.00', '0,00'],
            ['0.00', '00.00'],
            ['0.00', ' 0.00 '],
            ['123.00', '123'],
            ['123.00', '123.00'],
            ['123.00', '123,00'],
            ['123.00', '0123.00'],
            ['123.00', ' 123.00 '],
        ];

        tests.forEach((test) => {
            const parser = new AmountBaseInputParser(24, 2);
            const [expected, value] = test;

            parser.apply(value, value.length, '');

            expect(parser.getValue()).toBe(expected);
        });
    });
});
