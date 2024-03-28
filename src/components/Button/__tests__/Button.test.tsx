import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

describe('Button', () => {
    beforeEach(() => {
        allure.feature('Button');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    Button Name
                </Button>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('triggers click event', () => {
        const handleClick = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={handleClick} />);

        button.simulate('click');
        expect(handleClick).toHaveBeenCalled();
    });

    it('triggers mouseOver event', () => {
        const handleMouseOver = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onMouseOver={handleMouseOver} />);

        button.simulate('mouseOver');
        expect(handleMouseOver).toHaveBeenCalled();
    });

    it('triggers mouseOut event', () => {
        const handleMouseOut = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onMouseOut={handleMouseOut} />);

        button.simulate('mouseOut');
        expect(handleMouseOut).toHaveBeenCalled();
    });

    it('triggers mouseDown event', () => {
        const handleMouseDown = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onMouseDown={handleMouseDown} />);

        button.simulate('mouseDown');
        expect(handleMouseDown).toHaveBeenCalled();
    });

    it('triggers mouseUp event', () => {
        const handleMouseUp = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onMouseUp={handleMouseUp} />);

        button.simulate('mouseUp');
        expect(handleMouseUp).toHaveBeenCalled();
    });

    it('triggers keyDown event', () => {
        const handleKeyDown = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onKeyDown={handleKeyDown} />);

        button.simulate('keyDown');
        expect(handleKeyDown).toHaveBeenCalled();
    });

    it('triggers keyUp event', () => {
        const handleKeyUp = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onKeyUp={handleKeyUp} />);

        button.simulate('keyUp');
        expect(handleKeyUp).toHaveBeenCalled();
    });

    it('triggers focus event', () => {
        const handleFocus = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onFocus={handleFocus} />);

        button.simulate('focus');
        expect(handleFocus).toHaveBeenCalled();
    });

    it('triggers blur event', () => {
        const handleBlur = jest.fn();
        const button = shallow(<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onBlur={handleBlur} />);

        button.simulate('blur');
        expect(handleBlur).toHaveBeenCalled();
    });
});
