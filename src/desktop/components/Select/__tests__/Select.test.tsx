import React from 'react';
import {create} from 'react-test-renderer';
import {ISelectOption, Select} from '../Select';
import {allure} from '@jest/unit/allure-report';

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/triplex/common/utils/uniqueId', () => ({
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

        const tree = create(
            <Select data-test-id="Select" options={options} placeholder="Placeholder" value={options[0]} onChange={jest.fn()} />
        );

        expect(tree).toMatchSnapshot();
    });
});
