import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {RadioXGroup} from '@sberbusiness/triplex/components/Radio/RadioXGroup';
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

describe('RadioXGroup', () => {
    beforeEach(() => {
        allure.feature('RadioXGroup');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <RadioXGroup>
                    <Radio>Sample Text</Radio>
                    <Radio>Sample Text</Radio>
                    <Radio>Sample Text</Radio>
                </RadioXGroup>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
