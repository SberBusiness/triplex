import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {Spoiler} from '../Spoiler';
import {allure} from '@jest/unit/allure-report';

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

describe('Spoiler', () => {
    beforeEach(() => {
        allure.feature('Spoiler');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Spoiler labelExpand="Развернуть">
                    <span>123456</span>
                </Spoiler>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onToggle', () => {
        const handleToggle = jest.fn();
        const spoiler = shallow(<Spoiler labelExpand="Развернуть" onToggle={handleToggle} />);
        spoiler
            .childAt(0)
            .childAt(0)
            .childAt(0)
            .simulate('click');
        expect(handleToggle).toBeCalledTimes(1);
    });

    it('changes visibility state', () => {
        const spoiler = shallow(<Spoiler labelExpand="Развернуть" />);
        expect(spoiler.state('isExpanded')).toBeFalsy();
        spoiler
            .childAt(0)
            .childAt(0)
            .childAt(0)
            .simulate('click');
        expect(spoiler.state('isExpanded')).toBeTruthy();
        spoiler
            .childAt(0)
            .childAt(0)
            .childAt(0)
            .simulate('click');
        expect(spoiler.state('isExpanded')).toBeFalsy();
    });

    it('takes the initial state of visibility', () => {
        const spoiler = shallow(<Spoiler labelExpand="Развернуть" expanded={true} toggle={jest.fn()} />);

        expect(spoiler.state('isExpanded')).toBeTruthy();
    });
});
