import React from 'react';
import {allure} from '@jest/unit/allure-report';
import renderer from 'react-test-renderer';
import {AmountInput} from '../AmountInput';

describe('AmountInput', () => {
    beforeEach(() => {
        allure.feature('AmountInput');
    });

    it('renders correctly', () => {
        const component = <AmountInput value="1234567890" currency="RUB" onChange={() => void 0} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
