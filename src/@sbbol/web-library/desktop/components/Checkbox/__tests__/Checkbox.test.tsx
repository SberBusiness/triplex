import {shallow} from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {CheckboxYGroup} from '@sbbol/web-library/desktop/components/Checkbox/CheckboxYGroup';
import {CheckboxXGroup} from '@sbbol/web-library/desktop/components/Checkbox/CheckboxXGroup';
import {allure} from '@jest/unit/allure-report';

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

    const text = 'text';
    const options = [
        {
            label: 'First option',
        },
        {
            label: 'Second option',
        },
    ];

    it('renders checkbox correctly', () => {
        const tree = renderer.create(<Checkbox>{text}</Checkbox>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders checkbox disabled correctly', () => {
        const tree = renderer.create(<Checkbox disabled>{text}</Checkbox>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders checkboxYGroup correctly', () => {
        const tree = renderer
            .create(
                <CheckboxYGroup>
                    {options.map((item, index) => (
                        <Checkbox key={index}>{item.label}</Checkbox>
                    ))}
                </CheckboxYGroup>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders checkboxXGroup correctly', () => {
        const tree = renderer
            .create(
                <CheckboxXGroup>
                    {options.map((item, index) => (
                        <Checkbox key={index}>{item.label}</Checkbox>
                    ))}
                </CheckboxXGroup>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call checkbox onChange prop', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Checkbox onChange={handleChange} checked>
                {text}
            </Checkbox>
        );
        expect(wrapper.find('input[type="checkbox"]').props().checked).toBe(true);

        wrapper.find('input[type="checkbox"]').simulate('change', {target: {checked: false}});
        expect(handleChange).toHaveBeenCalledWith({target: {checked: false}});
    });

    it('disabled checkbox element', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <Checkbox onChange={handleChange} disabled>
                {text}
            </Checkbox>
        );

        expect(wrapper.find('input[type="checkbox"]').props().disabled).toBe(true);
    });
});
