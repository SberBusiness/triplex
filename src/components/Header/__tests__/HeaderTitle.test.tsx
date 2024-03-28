import React from 'react';
import renderer from 'react-test-renderer';
import {HeaderTitle} from '../components/HeaderTitle/HeaderTitle';

describe('HeaderTitle', () => {
    beforeEach(() => {
        allure.feature('HeaderTitle');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <HeaderTitle>
                    <HeaderTitle.Content>
                        <HeaderTitle.Content.Text>Text</HeaderTitle.Content.Text>
                        <HeaderTitle.Content.Subhead>Subhead</HeaderTitle.Content.Subhead>
                    </HeaderTitle.Content>
                    <HeaderTitle.Controls>Controls</HeaderTitle.Controls>
                </HeaderTitle>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
