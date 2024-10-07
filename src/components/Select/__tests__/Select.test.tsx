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
            {id: 'select-0', label: 'Первый', value: 'i1'},
            {id: 'select-1', label: 'Второй', value: 'i2'},
            {id: 'select-2', label: 'Третий', value: 'i3'},
        ];

        const tree = renderer.create(
            <Select data-test-id="Select" options={options} placeholder="Placeholder" value={options[0]} onChange={jest.fn()} />
        );

        expect(tree.toJSON()).toMatchSnapshot();
        tree.unmount();
    });
});
