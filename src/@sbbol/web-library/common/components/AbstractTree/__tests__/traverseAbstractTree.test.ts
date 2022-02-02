import {allure} from '@jest/unit/allure-report';
import {AbstractTreeNode, traverseAbstractTree} from '../AbstractTreeNode';

describe('traverseAbstractTreeNode', () => {
    let tree: AbstractTreeNode<any>;

    beforeEach(() => {
        allure.feature('traverseAbstractTree');
        tree = new AbstractTreeNode();
    });

    it('traverses tree', () => {
        const childNode1 = new AbstractTreeNode();
        const childNode2 = new AbstractTreeNode();
        const childNode3 = new AbstractTreeNode();
        const cb = jest.fn(() => true);

        tree.setChildren([childNode1, childNode2, childNode3]);
        traverseAbstractTree(tree, cb);

        expect(cb).toHaveBeenCalledTimes(4);
        expect(cb).toHaveBeenNthCalledWith<any>(1, tree);
        expect(cb).toHaveBeenNthCalledWith<any>(2, childNode1);
        expect(cb).toHaveBeenNthCalledWith<any>(3, childNode2);
        expect(cb).toHaveBeenNthCalledWith<any>(4, childNode3);
    });

    it('aborts traversal if callback returns false', () => {
        const childNode1 = new AbstractTreeNode();
        const childNode2 = new AbstractTreeNode();
        const childNode3 = new AbstractTreeNode();
        const cb = jest.fn(() => false);

        tree.setChildren([childNode1, childNode2, childNode3]);

        traverseAbstractTree(tree, cb);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenNthCalledWith<any>(1, tree);
    });
});
