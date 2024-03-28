import React from 'react';
import renderer from 'react-test-renderer';
import {AmountBaseInput} from '../AmountBaseInput';

describe('AmountBaseInput', () => {
    beforeEach(() => {
        allure.feature('AmountBaseInput');
    });

    it('renders correctly', () => {
        const component = <AmountBaseInput value="1234567890" onChange={() => {}} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
