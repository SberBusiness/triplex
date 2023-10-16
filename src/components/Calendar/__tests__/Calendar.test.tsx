import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import {getFormattedDate} from '@sberbusiness/triplex/utils/dateUtils';
import {Calendar} from '../Calendar';
import {allure} from '@jest/unit/allure-report';

jest.mock('@sberbusiness/icons/CaretleftSrvxIcon24', () => ({
    CaretleftSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretrightSrvxIcon24', () => ({
    CaretrightSrvxIcon24: 'svg',
}));

jest.mock('@sberbusiness/triplex/utils/uniqueId', () => ({
    uniqueId: jest.fn(() => 0),
}));

describe('Calendar', () => {
    beforeEach(() => {
        allure.feature('Calendar');
    });

    it('renders correctly', () => {
        const onChangeDate = jest.fn();
        const pickedDate = moment('20210101');
        const tree = renderer.create(<Calendar onChangeDate={onChangeDate} pickedDate={pickedDate} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('render disabled days', () => {
        const onChangeDate = jest.fn();
        const pickedDate = moment('20210101');
        const disabledDays = [
            getFormattedDate(moment('20210102')),
            getFormattedDate(moment('20210103')),
            getFormattedDate(moment('20210104')),
        ];
        const tree = renderer.create(<Calendar onChangeDate={onChangeDate} pickedDate={pickedDate} disabledDays={disabledDays} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('render marked days', () => {
        const onChangeDate = jest.fn();
        const pickedDate = moment('20210101');
        const markedDays = [
            getFormattedDate(moment('20210105')),
            getFormattedDate(moment('20210106')),
            getFormattedDate(moment('20210107')),
        ];
        const tree = renderer.create(<Calendar onChangeDate={onChangeDate} pickedDate={pickedDate} markedDays={markedDays} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
