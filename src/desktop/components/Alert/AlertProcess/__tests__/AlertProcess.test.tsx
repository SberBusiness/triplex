import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {AlertProcess} from '@sberbusiness/triplex/desktop/components/Alert/AlertProcess/AlertProcess';
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

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

describe('AlertProcess', () => {
    beforeEach(() => {
        allure.feature('AlertProcess');
    });

    const text = 'Sample Text';

    it('type info renders correctly', () => {
        const tree = renderer.create(<AlertProcess type={EAlertType.INFO}>{text}</AlertProcess>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type warning renders correctly', () => {
        const tree = renderer.create(<AlertProcess type={EAlertType.WARNING}>{text}</AlertProcess>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type error renders correctly', () => {
        const tree = renderer.create(<AlertProcess type={EAlertType.ERROR}>{text}</AlertProcess>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('type system renders correctly', () => {
        const tree = renderer.create(<AlertProcess type={EAlertType.FEATURE}>{text}</AlertProcess>).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
