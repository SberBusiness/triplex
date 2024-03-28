import React from 'react';
import renderer from 'react-test-renderer';
import {Page} from '../Page';

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/DropdownwhiteSrvxIcon16', () => ({
    DropdownwhiteSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

describe.skip('Page', () => {
    beforeEach(() => {
        allure.feature('Page');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Page>
                    <Page.Body>Text</Page.Body>
                </Page>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
