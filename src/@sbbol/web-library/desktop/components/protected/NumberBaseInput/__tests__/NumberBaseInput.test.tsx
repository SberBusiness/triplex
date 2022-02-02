import React from 'react';
import renderer from 'react-test-renderer';
import {NumberBaseInput} from '../NumberBaseInput';
import {allure} from '@jest/unit/allure-report';

describe('NumberBaseInput', () => {
    beforeEach(() => {
        allure.feature('AmountBaseInput');
    });

    it('renders correctly', () => {
        const component = <NumberBaseInput value="-8964152,37" onChange={jest.fn} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
