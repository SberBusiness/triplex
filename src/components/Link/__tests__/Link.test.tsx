import {shallow} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {allure} from '@jest/unit/allure-report';

describe('Link', () => {
    beforeEach(() => {
        allure.feature('Link');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <Link size={ELinkSize.SM} linkType={ELinkType.TEXT} href="#">
                    Test
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with after content', () => {
        const tree = renderer
            .create(
                <Link size={ELinkSize.SM} linkType={ELinkType.TEXT} contentAfter={() => <span>mock</span>} href="#">
                    Test
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with two words and after content', () => {
        const tree = renderer
            .create(
                <Link size={ELinkSize.SM} linkType={ELinkType.TEXT} contentAfter={() => <span>mock</span>} href="#">
                    Test link
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with before content', () => {
        const tree = renderer
            .create(
                <Link size={ELinkSize.SM} linkType={ELinkType.TEXT} contentBefore={() => <span>mock</span>} href="#">
                    Test
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with two words and before content', () => {
        const tree = renderer
            .create(
                <Link size={ELinkSize.SM} linkType={ELinkType.TEXT} contentBefore={() => <span>mock</span>} href="#">
                    Test link
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with both before and after content', () => {
        const tree = renderer
            .create(
                <Link
                    size={ELinkSize.SM}
                    linkType={ELinkType.TEXT}
                    contentBefore={() => <span>mock</span>}
                    contentAfter={() => <span>mock</span>}
                    href="#"
                >
                    Test
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with two words and both before and after content', () => {
        const tree = renderer
            .create(
                <Link
                    size={ELinkSize.SM}
                    linkType={ELinkType.TEXT}
                    contentBefore={() => <span>mock</span>}
                    contentAfter={() => <span>mock</span>}
                    href="#"
                >
                    Test link
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with three words and both before and after content', () => {
        const tree = renderer
            .create(
                <Link
                    size={ELinkSize.SM}
                    linkType={ELinkType.TEXT}
                    contentBefore={() => <span>mock</span>}
                    contentAfter={() => <span>mock</span>}
                    href="#"
                >
                    Test link again
                </Link>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('triggers click event', () => {
        const handleClick = jest.fn();
        const link = shallow(
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT} href="#" onClick={handleClick}>
                Test link
            </Link>
        );
        link.simulate('click');

        expect(handleClick).toBeCalledTimes(1);
    });

    it('triggers mouseOver event', () => {
        const handleMouseOver = jest.fn();
        const link = shallow(
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT} href="#" onMouseOver={handleMouseOver}>
                Test link
            </Link>
        );
        link.simulate('mouseOver');

        expect(handleMouseOver).toBeCalledTimes(1);
    });

    it('triggers mouseOut event', () => {
        const handleMouseOut = jest.fn();
        const link = shallow(
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT} href="#" onMouseOut={handleMouseOut}>
                Test link
            </Link>
        );
        link.simulate('mouseOut');

        expect(handleMouseOut).toBeCalledTimes(1);
    });

    it('triggers mouseDown event', () => {
        const handleMouseDown = jest.fn();
        const link = shallow(
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT} href="#" onMouseDown={handleMouseDown}>
                Test link
            </Link>
        );
        link.simulate('mouseDown');

        expect(handleMouseDown).toBeCalledTimes(1);
    });

    it('triggers mouseUp event', () => {
        const handleMouseUp = jest.fn();
        const link = shallow(
            <Link size={ELinkSize.LG} linkType={ELinkType.TEXT} href="#" onMouseUp={handleMouseUp}>
                Test link
            </Link>
        );
        link.simulate('mouseUp');

        expect(handleMouseUp).toBeCalledTimes(1);
    });
});
