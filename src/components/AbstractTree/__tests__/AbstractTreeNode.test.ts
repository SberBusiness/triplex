import {allure} from '@jest/unit/allure-report';
import {AbstractTreeNode} from '../AbstractTreeNode';

describe('AbstractTreeNode', () => {
    let tree: AbstractTreeNode<any>;

    beforeEach(() => {
        allure.feature('AbstractTree');
        tree = new AbstractTreeNode();
    });

    it('adds child with prevNode', () => {
        const firstNode = new AbstractTreeNode();
        const secondNode = new AbstractTreeNode();
        const thirdNode = new AbstractTreeNode();

        tree.addChild(firstNode);
        tree.addChild(thirdNode);
        // Добавление второй ноды после первой.
        tree.addChild(secondNode, firstNode);

        const children = tree.getChildren();

        expect(children[0]).toBe(firstNode);
        expect(children[1]).toBe(secondNode);
        expect(children[2]).toBe(thirdNode);
    });

    it('adds child with nextNode', () => {
        const firstNode = new AbstractTreeNode();
        const secondNode = new AbstractTreeNode();
        const thirdNode = new AbstractTreeNode();

        tree.addChild(firstNode);
        tree.addChild(thirdNode);
        // Добавление второй ноды перед третьей.
        tree.addChild(secondNode, undefined, thirdNode);

        const children = tree.getChildren();

        expect(children[0]).toBe(firstNode);
        expect(children[1]).toBe(secondNode);
        expect(children[2]).toBe(thirdNode);
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
