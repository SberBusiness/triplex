import React from 'react';
import renderer from 'react-test-renderer';
import {AmountCurrencySelect} from '../AmountCurrencySelect';

jest.mock('@sberbusiness/icons/CurrencySrvIcon20', () => ({
    CurrencySrvIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosetooltipSrvxIcon16', () => ({
    ClosetooltipSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/triplex/utils/uniqueId', () => ({
    uniqueId: jest.fn(() => 0),
}));

describe('AmountCurrencySelect', () => {
    beforeEach(() => {
        allure.feature('AmountCurrencySelect');
    });

    it('renders correctly', () => {
        const component = (
            <AmountCurrencySelect
                value="1234567890"
                onChange={() => void 0}
                currency={{label: 'RUB', value: 'RUB'}}
                currencyOptions={[
                    {label: 'RUB', value: 'RUB'},
                    {label: 'USD', value: 'USD'},
                ]}
                onSelect={() => void 0}
            />
        );
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
