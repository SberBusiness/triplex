import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {SmallInput} from '@sberbusiness/triplex/components/SmallInput/SmallInput';

describe('SmallInput', () => {
    beforeEach(() => {
        allure.feature('SmallInput');
    });

    it('renders correctly', () => {
        const onChangeMock = jest.fn();
        const tree = renderer.create(<SmallInput onChange={onChangeMock} value={'default-value'} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call onChange prop', () => {
        const handleChange = jest.fn();
        const event = {
            currentTarget: {value: 'some-value'},
        };
        const component = shallow(<SmallInput onChange={handleChange} value={'default-value'} />);
        component.simulate('change', event);

        expect(handleChange).toHaveBeenCalledWith({currentTarget: {value: 'some-value'}});
    });
});
