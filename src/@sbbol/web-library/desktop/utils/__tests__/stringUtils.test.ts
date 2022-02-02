import {StringUtils} from '../stringUtils';
import {allure} from '@jest/unit/allure-report';

describe('StringUtils', () => {
    beforeEach(() => {
        allure.feature('StringUtils');
    });

    it('removeSpaces удаляет пробелы', () => {
        const text = 'Скажем нет пробелам!';

        const result = StringUtils.removeSpaces(text);

        expect(result).toBe('Скажемнетпробелам!');
    });
});
