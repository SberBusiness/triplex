import React from 'react';
import renderer from 'react-test-renderer';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

jest.mock('react-text-mask', () => ({
    __esModule: true,
    default: jest.fn(({mask, placeholderChar, ...props}: any) => <input type="text" {...props} />),
    conformToMask: jest.fn((x) => ({conformedValue: x})),
}));

describe('MaskedInput', () => {
    beforeEach(() => {
        allure.feature('MaskedInput');
    });

    it('renders correctly', () => {
        const tree = renderer.create(<MaskedInput value="1234567890" onChange={() => undefined} mask={MaskedInput.presets.masks.phone} />);

        expect(tree.toJSON()).toMatchSnapshot();
        tree.unmount();
    });
});
