import React from 'react';
import renderer from 'react-test-renderer';
import {HeaderTitle} from '../components/HeaderTitle/HeaderTitle';
import {allure} from '@jest/unit/allure-report';

describe('HeaderTitle', () => {
    beforeEach(() => {
        allure.feature('HeaderTitle');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <HeaderTitle>
                    <HeaderTitle.Link>Link text</HeaderTitle.Link>
                    <HeaderTitle.Content>
                        <HeaderTitle.Content.Text>Text</HeaderTitle.Content.Text>
                        <HeaderTitle.Content.Controls>Controls</HeaderTitle.Content.Controls>
                    </HeaderTitle.Content>
                    <HeaderTitle.Subhead>Text</HeaderTitle.Subhead>
                </HeaderTitle>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
