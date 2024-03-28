import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';

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

jest.mock('react-text-mask', () => ({
    __esModule: true,
    default: jest.fn(({mask, placeholderChar, ...props}: any) => <input type="text" {...props} />),
    conformToMask: jest.fn((x) => ({conformedValue: x})),
}));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('DatePicker', () => {
    beforeEach(() => {
        allure.feature('DatePicker');
    });

    it('renders correctly', () => {
        const handleChange = jest.fn();
        const value = getFormattedDate(moment('20210101'));
        const tree = renderer.create(<DatePicker value={value} onChange={handleChange} />);

        expect(tree.toJSON()).toMatchSnapshot();
        tree.unmount();
    });
});
