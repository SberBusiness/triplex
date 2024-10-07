import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CalendarSrvIcon20', () => ({
    CalendarSrvIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretleftSrvxIcon24', () => ({
    CaretleftSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretrightSrvxIcon24', () => ({
    CaretrightSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/HeaderkebabSrvxIcon16', () => ({
    HeaderkebabSrvxIcon16: 'svg',
}));

jest.mock('react-text-mask', () => ({
    __esModule: true,
    conformToMask: jest.fn((x) => ({conformedValue: x})),
    default: jest.fn(({mask, placeholderChar, ...props}: any) => <input type="text" {...props} />),
}));

Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
        addEventListener: jest.fn(),
        addListener: jest.fn(), // deprecated
        dispatchEvent: jest.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: jest.fn(),
        removeListener: jest.fn(), // deprecated
    })),
    writable: true,
});

describe('DatePicker', () => {
    beforeEach(() => {
        allure.feature('DatePicker');
    });

    it('renders correctly', () => {
        const handleChange = jest.fn();
        const value = getFormattedDate(moment('1970-01-01'));
        const tree = renderer.create(<DatePicker value={value} onChange={handleChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
