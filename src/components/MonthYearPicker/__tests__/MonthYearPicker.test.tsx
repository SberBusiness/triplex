import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';
import {MonthYearPicker} from '../MonthYearPicker';

jest.mock('@sberbusiness/icons/CalendarSrvIcon20', () => ({
    CalendarSrvIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretleftSrvxIcon24', () => ({
    CaretleftSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretrightSrvxIcon24', () => ({
    CaretrightSrvxIcon24: 'svg',
}));

describe('MonthYearPicker', () => {
    (global as any).document = {
        addEventListener: jest.fn(),
    };

    it('renders correctly', () => {
        const handleChange = jest.fn();
        const value = getFormattedDate(moment('1970-01-01'));
        const tree = renderer.create(<MonthYearPicker value={value} onChange={handleChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
