import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {shallow} from 'enzyme';
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

describe('Radio', () => {
    beforeEach(() => {
        allure.feature('Radio');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Radio>Sample Text</Radio>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders disabled state correctly', () => {
        const tree = renderer.create(<Radio disabled>Sample Text</Radio>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onChange handler', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Radio onChange={handleChange} checked>
                Sample Text
            </Radio>
        );

        expect(wrapper.find('input[type="radio"]').props().checked).toBe(true);
        wrapper.find('input[type="radio"]').simulate('change', {target: {checked: false}});
        expect(handleChange).toHaveBeenCalledWith({target: {checked: false}});
    });

    it('gets disabled', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Radio onChange={handleChange} disabled>
                Sample Text
            </Radio>
        );

        expect(wrapper.find('input[type="radio"]').props().disabled).toBe(true);
    });
});
