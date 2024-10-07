import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {MonthYearPicker} from '@sberbusiness/triplex/components/MonthYearPicker/MonthYearPicker';
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

describe('MonthYearPicker', () => {
    beforeEach(() => {
        allure.feature('DatePicker');
    });

    it('renders correctly', () => {
        const handleChange = jest.fn();
        const value = getFormattedDate(moment('1970-01-01'));
        const tree = renderer.create(<MonthYearPicker value={value} onChange={handleChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
