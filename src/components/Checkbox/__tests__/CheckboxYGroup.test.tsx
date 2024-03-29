import React from 'react';
import renderer from 'react-test-renderer';
import {CheckboxYGroup} from '@sberbusiness/triplex/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

jest.mock('@sberbusiness/icons/CheckboxtickStsIcon16', () => ({
    CheckboxtickStsIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/CheckboxbulkStsIcon16', () => ({
    CheckboxbulkStsIcon16: 'svg',
}));

describe('CheckboxYGroup', () => {
    beforeEach(() => {
        allure.feature('CheckboxYGroup');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <CheckboxYGroup>
                    <Checkbox>Sample Text</Checkbox>
                    <Checkbox>Sample Text</Checkbox>
                    <Checkbox>Sample Text</Checkbox>
                </CheckboxYGroup>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
