import {traverseAbstractTree} from '@sberbusiness/triplex/common/components/AbstractTree/AbstractTreeNode';
import {TreeViewAbstractNode} from '@sberbusiness/triplex/desktop/components/TreeView/TreeViewAbstractNode';

/**
 * Утилиты для работы с AbstractNode.
 */
interface ITreeViewAbstractNodeUtils {
    // Возвращает AbstractNode по id.
    getNode: (nodeId: string, rootNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    // Возвращает следующую ноду текущего уровня. Если prevNode имеет дочерние ноды, и prevNode.getOpened() === true будет возвращена первая дочерняя нода. Если prevNode - последняя нода текущего уровня, будет возвращена следующая нода
    // верхнего уровня. Если верхний уровень - rootNode, будет возвращена первая дочерняя нода rootNode.
    getNextNode: (prevNode: TreeViewAbstractNode) => TreeViewAbstractNode;
    // Возвращает следующую ноду текущего уровня. Если prevNode - последняя нода, будет возвращено undefined.
    getNextSiblingNode: (prevNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    // Возвращает предыдущую ноду текущего уровня. Если предыдущая нода имеет детей и она раскрыта, будет возвращена последняя ее дочерняя нода. Если nextNode - первая нода, будет возвращена родительская нода. Если верхний
    // уровень - rootNode, будет возвращена последняя дочерняя нода rootNode.
    getPrevNode: (nextNode: TreeViewAbstractNode) => TreeViewAbstractNode;
    // Возвращает предыдущую ноду текущего уровня дерева. В случае если nextNode - первая нода, будет возвращено undefined.
    getPrevSiblingNode: (nextNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    // Возвращает активную ноду в случае ее наличия.
    getActiveNode: (node: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    // Возвращает true/false в зависимости от того, один родитель у нод или нет.
    isSiblingsNodes: (nodes: TreeViewAbstractNode[]) => boolean;
    // Устанавливает флаг активности AbstractNode.
    setActiveNode: (node: TreeViewAbstractNode, rootNode: TreeViewAbstractNode, isActive: boolean) => void;
    // Устанавливает флаг активности AbstractNode для следующей ноды дерева. Если нода раскрыта, будет активна первая дочерняя нода, если нода закрыта - будет активирована следующая нода этого же уровня.
    setActiveNextNode: (rootNode: TreeViewAbstractNode) => void;
    // Устанавливает флаг активности AbstractNode для предыдущей ноды дерева.
    setActivePrevNode: (rootNode: TreeViewAbstractNode) => void;
    // Возвращает rootNode.
    getRootNode: (node: TreeViewAbstractNode) => TreeViewAbstractNode;
    // Вовзращает true если нода - последняя в дереве.
    isLastNode: (node: TreeViewAbstractNode) => boolean;
}

/**
 * Утилиты для работы с AbstractNode.
 */
export const TreeViewAbstractNodeUtils: ITreeViewAbstractNodeUtils = {
    getNode: (nodeId, rootNode) => {
        let result;
        traverseAbstractTree(rootNode, (node) => {
            if (node.getId() === nodeId) {
                result = node;
                // Прервать обход дерева.
                return false;
            }
            // Продолжить обход дерева.
            return true;
        });

        return result;
    },
    getNextNode: (node) => {
        // Выбор следующей ноды текущего уровня вложенности.
        const nextSiblingNode = TreeViewAbstractNodeUtils.getNextSiblingNode(node);
        // as TreeViewAbstractNode потому что .getParent() может вернуть null только для rootNode, prevNode не может быть rootNode.
        const parentNode = node.getParent() as TreeViewAbstractNode;
        const childrenNodes = node.getChildren();

        // Нода раскрыта и имеются дочерние ноды. Следующей нодой будет первая дочерняя нода.
        if (node.getOpened() && childrenNodes.length) {
            return childrenNodes[0];
        }

        // Найдена следующая нода текущего уровня вложенности.
        if (nextSiblingNode) {
            return nextSiblingNode;
        }

        const grandParent = parentNode.getParent();
        if (grandParent) {
            // Есть ноды верхнего уровня.

            // Выбор следующей ноды верхнего уровня вложенности.
            const nextSiblingParentNode = TreeViewAbstractNodeUtils.getNextSiblingNode(parentNode);
            if (nextSiblingParentNode) {
                return nextSiblingParentNode;
            }

            // Возвращается первая нода верхнего уровня вложенности.
            return grandParent.getChildren()[0];
        }

        // Возвращается первая нода текущего уровня вложенности.
        return parentNode.getChildren()[0];
    },
    getNextSiblingNode: (node) => {
        const parentNodeChildren = node.getParent()!.getChildren();
        // Индекс текущей активной ноды в массиве parentNode.getChildren().
        let currentActiveNodeIndex = 0;
        // Поиск индекса текущей активной ноды в массиве parentNode.getChildren().
        parentNodeChildren.some((n, index) => {
            if (n.getId() === node.getId()) {
                currentActiveNodeIndex = index;
                return true;
            }
        });

        // Текущая активная нода - последняя.
        if (currentActiveNodeIndex === parentNodeChildren.length - 1) {
            return undefined;
        }

        // Возвращается следующая нода.
        return parentNodeChildren[currentActiveNodeIndex + 1];
    },
    getPrevNode: (node) => {
        // Выбор предыдущей ноды текущего уровня вложенности.
        const prevSiblingNode = TreeViewAbstractNodeUtils.getPrevSiblingNode(node);
        // as TreeViewAbstractNode потому что .getParent() может вернуть null только для rootNode, nextNode не может быть rootNode.
        const parentNode = node.getParent() as TreeViewAbstractNode;

        // Найдена предыдущая нода текущего уровня вложенности.
        if (prevSiblingNode) {
            // Предыдущая и текущая активная нода - на одном уровне вложенности.
            if (TreeViewAbstractNodeUtils.isSiblingsNodes([node, prevSiblingNode])) {
                const prevSiblingNodeChildren = prevSiblingNode.getChildren();

                // Предыдущая нода раскрыта и имеет дочерние ноды. Предыдущей станет последняя ее дочерняя нода.
                if (prevSiblingNode.getOpened() && prevSiblingNodeChildren.length) {
                    return prevSiblingNodeChildren[prevSiblingNodeChildren.length - 1];
                }
            }

            return prevSiblingNode;
        } else if (parentNode.getParent()) {
            // Есть ноды верхнего уровня.

            return parentNode;
        }

        // Возвращается последняя нода текущего уровня вложенности.
        return parentNode.getChildren()[parentNode.getChildren().length - 1];
    },
    getPrevSiblingNode: (node) => {
        const parentNodeChildren = node.getParent()!.getChildren();
        // Индекс текущей активной ноды в массиве parentNode.getChildren().
        let currentActiveNodeIndex = 0;
        // Поиск индекса текущей активной ноды в массиве parentNode.getChildren().
        parentNodeChildren.some((n, index) => {
            if (n.getId() === node.getId()) {
                currentActiveNodeIndex = index;
                return true;
            }
        });

        // Текущая активная нода - первая.
        if (currentActiveNodeIndex === 0) {
            return undefined;
        }

        // Возвращается предыдущая нода.
        return parentNodeChildren[currentActiveNodeIndex - 1];
    },
    isSiblingsNodes: (nodes) => {
        // as TreeViewAbstractNode потому что .getParent() может вернуть null только для rootNode, nodes[0] не может быть rootNode.
        const firstNodeParentId = (nodes[0].getParent() as TreeViewAbstractNode).getId();
        return nodes.every((n) => (n.getParent() as TreeViewAbstractNode).getId() === firstNodeParentId);
    },
    getActiveNode: (node) => {
        let activeNode: TreeViewAbstractNode | undefined;

        traverseAbstractTree(node, (n) => {
            if (n.getActive()) {
                activeNode = n;
                // Прервать обход дерева.
                return false;
            }

            // Продолжить обход дерева.
            return true;
        });

        return activeNode;
    },
    setActiveNode: (node, rootNode, isActive) => {
        if (isActive) {
            node.setActive(true);

            traverseAbstractTree(rootNode, (n) => {
                if (n.getActive() && n.getId() !== node.getId()) {
                    // Сброс флага активности всех других нод, активная может быть только одна нода.
                    n.setActive(false);
                }

                // Продолжить обход дерева.
                return true;
            });
        } else {
            node.setActive(false);
        }
    },
    setActiveNextNode: (rootNode) => {
        const activeNode = TreeViewAbstractNodeUtils.getActiveNode(rootNode);

        if (activeNode) {
            const nextActiveNode = TreeViewAbstractNodeUtils.getNextNode(activeNode);

            nextActiveNode && TreeViewAbstractNodeUtils.setActiveNode(nextActiveNode, rootNode, true);
        }
    },
    setActivePrevNode: (rootNode) => {
        const activeNode = TreeViewAbstractNodeUtils.getActiveNode(rootNode);

        if (activeNode) {
            const prevActiveNode = TreeViewAbstractNodeUtils.getPrevNode(activeNode);

            prevActiveNode && TreeViewAbstractNodeUtils.setActiveNode(prevActiveNode, rootNode, true);
        }
    },
    getRootNode: (node) => {
        let rootNode = node;
        while (rootNode.getParent() !== null) {
            rootNode = rootNode.getParent() as TreeViewAbstractNode;
        }
        return rootNode;
    },
    isLastNode: (node) => TreeViewAbstractNodeUtils.getNextNode(node) === TreeViewAbstractNodeUtils.getRootNode(node).getChildren()[0],
};
