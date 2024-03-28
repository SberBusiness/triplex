import React from 'react';
import {Input} from '../Input';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Input', () => {
    beforeEach(() => {
        allure.feature('Input');
    });

    it('renders correctly', () => {
        const onChangeMock = jest.fn();
        const tree = renderer.create(<Input onChange={onChangeMock} value={'default-value'} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call onChange prop', () => {
        const handleChange = jest.fn();
        const event = {
            currentTarget: {value: 'some-value'},
        };
        const component = shallow(<Input onChange={handleChange} value={'default-value'} />);
        component.simulate('change', event);

        expect(handleChange).toHaveBeenCalledWith({currentTarget: {value: 'some-value'}});
    });
});
