import React from 'react';
import renderer from 'react-test-renderer';
import '../../../tests/mock/matchMedia.mock';
import {ISelectOption, Select} from '../Select';

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosetooltipSrvxIcon16', () => ({
    ClosetooltipSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/triplex/utils/uniqueId', () => ({
    uniqueId: jest.fn(() => 0),
}));

describe('Select', () => {
    beforeEach(() => {
        allure.feature('Select');
    });

    it('should render correctly', () => {
        const options: Array<ISelectOption> = [
            {value: 'i1', label: 'Первый'},
            {value: 'i2', label: 'Второй'},
            {value: 'i3', label: 'Третий'},
        ];

        const tree = renderer.create(
            <Select data-test-id="Select" options={options} placeholder="Placeholder" value={options[0]} onChange={jest.fn()} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
        tree.unmount();
    });
});
