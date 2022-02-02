import {allure} from '@jest/unit/allure-report';
import {TreeViewAbstractNode} from '../TreeViewAbstractNode';
import {TreeViewAbstractNodeUtils} from '../TreeViewAbstractNodeUtils';

describe('TreeViewAbstractNodeUtils', () => {
    let rootNode: TreeViewAbstractNode;

    beforeEach(() => {
        allure.feature('TreeViewAbstractNodeUtils');
        rootNode = new TreeViewAbstractNode({id: '1'});
    });

    it('returns node by id', () => {
        const childNode = new TreeViewAbstractNode({id: '2'});
        rootNode.addChild(childNode);

        const result = TreeViewAbstractNodeUtils.getNode(childNode.getId(), rootNode);
        expect(result).toEqual(childNode);
    });

    it('returns next node', () => {
        const node1_level1 = new TreeViewAbstractNode({id: '1-1'});
        const node2_level1 = new TreeViewAbstractNode({id: '1-2'});
        const node1_level1_child1 = new TreeViewAbstractNode({id: '1-1-1'});
        const node1_level1_child2 = new TreeViewAbstractNode({id: '1-1-2'});

        node1_level1.setOpened(true);
        rootNode.setChildren([node1_level1, node2_level1]);
        node1_level1.setChildren([node1_level1_child1, node1_level1_child2]);

        const result1 = TreeViewAbstractNodeUtils.getNextNode(node1_level1);
        // Вернулась первая дочерняя нода.
        expect(result1).toEqual(node1_level1_child1);

        const result2 = TreeViewAbstractNodeUtils.getNextNode(node1_level1_child1);
        // Вернулась следующая нода того же уровня.
        expect(result2).toEqual(node1_level1_child2);

        const result3 = TreeViewAbstractNodeUtils.getNextNode(node1_level1_child2);
        // Вернулась следующая нода родительского уровня.
        expect(result3).toEqual(node2_level1);

        const result4 = TreeViewAbstractNodeUtils.getNextNode(node2_level1);
        // Вернулась первая нода текущего уровня.
        expect(result4).toEqual(node1_level1);
    });

    it('returns next sibling node', () => {
        const node1 = new TreeViewAbstractNode({id: '2'});
        const node2 = new TreeViewAbstractNode({id: '3'});
        const node3 = new TreeViewAbstractNode({id: '4'});
        rootNode.setChildren([node1, node2, node3]);

        const result1 = TreeViewAbstractNodeUtils.getNextSiblingNode(node1);
        expect(result1).toEqual(node2);

        const result2 = TreeViewAbstractNodeUtils.getNextSiblingNode(node2);
        expect(result2).toEqual(node3);

        const result3 = TreeViewAbstractNodeUtils.getNextSiblingNode(node3);
        expect(result3).toBeUndefined();
    });

    it('returns prev node', () => {
        const node1_level1 = new TreeViewAbstractNode({id: '1-1'});
        const node2_level1 = new TreeViewAbstractNode({id: '1-2'});
        const node3_level1 = new TreeViewAbstractNode({id: '1-3'});
        const node2_level1_child1 = new TreeViewAbstractNode({id: '1-2-1'});
        const node2_level1_child2 = new TreeViewAbstractNode({id: '1-2-2'});

        node2_level1.setOpened(true);
        rootNode.setChildren([node1_level1, node2_level1]);
        node2_level1.setChildren([node2_level1_child1, node2_level1_child2, node3_level1]);

        const result1 = TreeViewAbstractNodeUtils.getPrevNode(node2_level1_child1);
        // Вернулась родительская нода.
        expect(result1).toEqual(node2_level1);

        const result2 = TreeViewAbstractNodeUtils.getPrevNode(node2_level1_child2);
        // Вернулась предыдущая нода текущего уровня.
        expect(result2).toEqual(node2_level1_child1);

        const result3 = TreeViewAbstractNodeUtils.getPrevNode(node3_level1);
        // Вернулась последняя дочерняя нода предыдущей родительской ноды.
        expect(result3).toEqual(node2_level1_child2);
    });

    it('returns prev sibling node', () => {
        const node1 = new TreeViewAbstractNode({id: '2'});
        const node2 = new TreeViewAbstractNode({id: '3'});
        const node3 = new TreeViewAbstractNode({id: '4'});

        rootNode.setChildren([node1, node2, node3]);

        const result1 = TreeViewAbstractNodeUtils.getPrevSiblingNode(node1);
        expect(result1).toBeUndefined();

        const result2 = TreeViewAbstractNodeUtils.getPrevSiblingNode(node2);
        expect(result2).toEqual(node1);

        const result3 = TreeViewAbstractNodeUtils.getPrevSiblingNode(node3);
        expect(result3).toEqual(node2);
    });

    it('returns true if active node exists', () => {
        const node = new TreeViewAbstractNode({id: '2'});
        node.setActive(true);
        rootNode.setChildren([node]);

        const result = Boolean(TreeViewAbstractNodeUtils.getActiveNode(rootNode));
        expect(result).toBeTruthy();
    });

    it("returns false if active node doesn't exist", () => {
        const node = new TreeViewAbstractNode({id: '2'});
        node.setActive(false);
        rootNode.setChildren([node]);

        const result = TreeViewAbstractNodeUtils.getActiveNode(rootNode);
        expect(result).toBeUndefined();
    });

    it('returns true if nodes are sibling', () => {
        const node1 = new TreeViewAbstractNode({id: '2'});
        const node2 = new TreeViewAbstractNode({id: '3'});
        rootNode.setChildren([node1, node2]);

        const result = TreeViewAbstractNodeUtils.isSiblingsNodes([node1, node1]);
        expect(result).toBeTruthy();
    });

    it('returns false if nodes are not sibling', () => {
        const node1 = new TreeViewAbstractNode({id: '2'});
        const node2 = new TreeViewAbstractNode({id: '3'});
        rootNode.addChild(node1);
        node1.addChild(node2);

        const result = TreeViewAbstractNodeUtils.isSiblingsNodes([node1, node1]);
        expect(result).toBeTruthy();
    });
});
