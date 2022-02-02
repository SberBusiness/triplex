import React from 'react';
import renderer from 'react-test-renderer';
import {Amount} from '../Amount';
import {allure} from '@jest/unit/allure-report';

describe('Amount', () => {
    beforeEach(() => {
        allure.feature('Amount');
    });

    it('renders correctly', () => {
        const component = <Amount value="-8964152,37" currency="RUB" currencyTitle="Российские рубли" dataTestId="amount" />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
