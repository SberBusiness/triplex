import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {shallow} from 'enzyme';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';

jest.mock('@sberbusiness/icons/CheckboxtickStsIcon16', () => ({
    CheckboxtickStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/CheckboxbulkStsIcon16', () => ({
    CheckboxbulkStsIcon16: 'svg',
}));

describe('Checkbox', () => {
    beforeEach(() => {
        allure.feature('Checkbox');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Checkbox>Sample Text</Checkbox>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders disabled state correctly', () => {
        const tree = renderer.create(<Checkbox disabled>Sample Text</Checkbox>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onChange handler', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Checkbox onChange={handleChange} checked>
                Sample Text
            </Checkbox>
        );

        expect(wrapper.find('input[type="checkbox"]').props().checked).toBe(true);
        wrapper.find('input[type="checkbox"]').simulate('change', {target: {checked: false}});
        expect(handleChange).toHaveBeenCalledWith({target: {checked: false}});
    });

    it('gets disabled', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Checkbox onChange={handleChange} disabled>
                Sample Text
            </Checkbox>
        );

        expect(wrapper.find('input[type="checkbox"]').props().disabled).toBe(true);
    });
});
