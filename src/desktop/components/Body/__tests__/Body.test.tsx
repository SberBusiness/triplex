import React from 'react';
import renderer from 'react-test-renderer';
import {Body} from '../Body';
import {allure} from '@jest/unit/allure-report';

describe('Body', () => {
    beforeEach(() => {
        allure.feature('Body');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Body>Text</Body>).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
