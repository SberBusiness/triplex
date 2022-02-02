import React from 'react';
import renderer from 'react-test-renderer';
import {AmountInput} from '../AmountInput';
import {allure} from '@jest/unit/allure-report';

describe('AmountInput', () => {
    beforeEach(() => {
        allure.feature('AmountInput');
    });

    it('renders correctly', () => {
        const component = <AmountInput value="-8964152,37" currency="RUB" onChange={() => void 0} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
