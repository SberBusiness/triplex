import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {getFormattedDate} from '@sbbol/web-library/desktop/utils/dateUtils';
import {DatePicker} from '../DatePicker';
import {allure} from '@jest/unit/allure-report';

jest.mock('@sberbusiness/icons/CalendarSrvIcon20', () => ({
    CalendarSrvIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretleftSrvxIcon24', () => ({
    CaretleftSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretrightSrvxIcon24', () => ({
    CaretrightSrvxIcon24: 'svg',
}));

describe('DatePicker', () => {
    beforeEach(() => {
        allure.feature('DatePicker');
    });

    (global as any).document = {
        addEventListener: jest.fn(),
    };

    it('renders correctly', () => {
        const handleChange = jest.fn();
        const value = getFormattedDate(moment('20210101'));
        const tree = renderer.create(<DatePicker value={value} onChange={handleChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
