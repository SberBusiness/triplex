import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {MaskedInput} from '@sbbol/web-library/desktop/components/MaskedInput/MaskedInput';

describe('MaskedInput', () => {
    beforeEach(() => {
        allure.feature('MaskedInput');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<MaskedInput value="1234567890" onChange={() => undefined} mask="+7dddddddddd" />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
