import React from 'react';
import renderer from 'react-test-renderer';
import {Footer} from '../Footer';

describe('Footer', () => {
    beforeEach(() => {
        allure.feature('Footer');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Footer>
                    <Footer.Description>
                        <Footer.Description.Content>Text</Footer.Description.Content>
                        <Footer.Description.Controls>Controls</Footer.Description.Controls>
                    </Footer.Description>
                </Footer>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
