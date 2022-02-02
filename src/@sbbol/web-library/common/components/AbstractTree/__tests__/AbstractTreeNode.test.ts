import {allure} from '@jest/unit/allure-report';
import {AbstractTreeNode} from '../AbstractTreeNode';

describe('AbstractTreeNode', () => {
    let tree: AbstractTreeNode<any>;

    beforeEach(() => {
        allure.feature('AbstractTree');
        tree = new AbstractTreeNode();
    });

    it('adds child', () => {
        tree.addChild(new AbstractTreeNode());
        let children = tree.getChildren();
        expect(children.length).toBe(1);
        tree.addChild(new AbstractTreeNode());
        children = tree.getChildren();
        expect(children.length).toBe(2);
    });

    it('adds and returns children', () => {
        tree.setChildren([new AbstractTreeNode()]);
        tree.setChildren([new AbstractTreeNode(), new AbstractTreeNode()]);
        const children = tree.getChildren();
        expect(children.length).toBe(2);
    });

    it('removes child', () => {
        const secondChild = new AbstractTreeNode();
        tree.setChildren([new AbstractTreeNode(), secondChild, new AbstractTreeNode()]);
        tree.removeChild(secondChild);
        const children = tree.getChildren();
        expect(secondChild.getParent()).toBeNull();
        expect(children.length).toBe(2);
    });

    it('returns parent node', () => {
        const childNode = new AbstractTreeNode();
        tree.setChildren([childNode]);
        const parentNode = childNode.getParent();
        expect(parentNode).toEqual(tree);
    });
});
