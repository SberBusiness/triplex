import React from 'react';
import renderer from 'react-test-renderer';
import {Body} from '../Body';

describe('Body', () => {
    beforeEach(() => {
        allure.feature('Body');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Body>Text</Body>).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
