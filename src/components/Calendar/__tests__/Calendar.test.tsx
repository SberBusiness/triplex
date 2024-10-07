import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretleftSrvxIcon24', () => ({
    CaretleftSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretrightSrvxIcon24', () => ({
    CaretrightSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/triplex/utils/uniqueId', () => ({
    uniqueId: jest.fn(() => 0),
}));

jest.mock('@sberbusiness/icons/HeaderkebabSrvxIcon16', () => ({
    HeaderkebabSrvxIcon16: 'svg',
}));

describe('Calendar', () => {
    beforeEach(() => {
        allure.feature('Calendar');
    });

    it('renders correctly', () => {
        const pickedDate = moment('19700101');
        const onDateChange = jest.fn();
        const tree = renderer.create(<Calendar pickedDate={pickedDate} onDateChange={onDateChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('render disabled days', () => {
        const pickedDate = moment('19700101');
        const disabledDays = [
            getFormattedDate(moment('19700101')),
            getFormattedDate(moment('19700102')),
            getFormattedDate(moment('19700103')),
        ];
        const onDateChange = jest.fn();
        const tree = renderer.create(<Calendar pickedDate={pickedDate} disabledDays={disabledDays} onDateChange={onDateChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('render marked days', () => {
        const pickedDate = moment('19700101');
        const markedDays = [
            getFormattedDate(moment('19700101')),
            getFormattedDate(moment('19700102')),
            getFormattedDate(moment('19700103')),
        ];
        const onDateChange = jest.fn();
        const tree = renderer.create(<Calendar pickedDate={pickedDate} markedDays={markedDays} onDateChange={onDateChange} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
