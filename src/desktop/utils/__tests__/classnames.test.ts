import {classnames} from '../../../common/utils/classnames/classnames';
import {allure} from '@jest/unit/allure-report';

describe('classnames', () => {
    beforeEach(() => {
        allure.feature('classnames');
    });

    it('returns an empty string, if params is undefined', () => {
        expect(classnames()).toBe('');
    });

    it('returns a string, if param is string', () => {
        expect(classnames('foo')).toBe('foo');
    });

    it('returns a string, if param is number', () => {
        expect(classnames(10)).toBe('10');
    });

    it('returns a string, if param is Array', () => {
        expect(classnames(['foo', 'bar'])).toBe('foo bar');
    });

    it('returns a string from valid object keys', () => {
        expect(classnames({foo: true, bar: true, baz: false})).toBe('foo bar');
    });

    it('returns a string from multiple params', () => {
        expect(classnames('foo', {bar: true})).toBe('foo bar');
    });
});
