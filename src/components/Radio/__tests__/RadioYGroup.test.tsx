import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {RadioYGroup} from '@sberbusiness/triplex/components/Radio/RadioYGroup';
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

describe('RadioYGroup', () => {
    beforeEach(() => {
        allure.feature('RadioYGroup');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <RadioYGroup>
                    <Radio>Sample Text</Radio>
                    <Radio>Sample Text</Radio>
                    <Radio>Sample Text</Radio>
                </RadioYGroup>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
