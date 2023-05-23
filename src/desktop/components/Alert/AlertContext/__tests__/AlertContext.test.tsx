import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {AlertContext} from '@sberbusiness/triplex/desktop/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';

jest.mock('@sberbusiness/icons/InfoStsIcon16', () => ({
    InfoStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/WarningStsIcon16', () => ({
    WarningStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/ErrorStsIcon16', () => ({
    ErrorStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/SystemStsIcon16', () => ({
    SystemStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/ReportstogovernmentPrdIcon20', () => ({
    ReportstogovernmentPrdIcon20: 'svg',
}));

describe('AlertContext', () => {
    beforeEach(() => {
        allure.feature('AlertContext');
    });

    const text = 'Sample Text';

    it('type info renders correctly', () => {
        const tree = renderer.create(<AlertContext type={EAlertType.INFO}>{text}</AlertContext>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type warning renders correctly', () => {
        const tree = renderer.create(<AlertContext type={EAlertType.WARNING}>{text}</AlertContext>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type error renders correctly', () => {
        const tree = renderer.create(<AlertContext type={EAlertType.ERROR}>{text}</AlertContext>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type system renders correctly', () => {
        const tree = renderer.create(<AlertContext type={EAlertType.SYSTEM}>{text}</AlertContext>).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
