import {isEqual} from '@sbbol/web-library/desktop/utils/isEqual';

/**
 * Базовая реализация абстрактного дерева.
 */
export class AbstractTreeNode<T extends AbstractTreeNode<T>> {
    // Массив дочерних нод.
    private children: T[] = [];
    // Родительская нода.
    private parent: T | null = null;

    /**
     * Возвращает дочерние ноды.
     */
    public getChildren = (): T[] => this.children;

    /**
     * Добавляет дочернюю ноду к текущим.
     */
    public addChild = (node: T): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node.setParent(this);
        this.children.push(node);
    };

    /**
     * Удаляет дочернюю ноду.
     */
    public removeChild = (node: T): void => {
        const index = this.children.findIndex((n) => isEqual(n, node));
        if (index > -1) {
            this.children.splice(index, 1);
            node.setParent(null);
        }
    };

    /**
     * Устанавливает дочерние ноды вместо текущих дочерних нод.
     */
    public setChildren = (nodes: T[]): void => {
        this.children.forEach((c) => c.setParent(null));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nodes.forEach((node) => node.setParent(this));
        this.children = nodes;
    };

    /**
     * Возвращает родительскую ноду.
     */
    public getParent = (): T | null => this.parent;

    /**
     * Устанавливает родителскую ноду.
     */
    public setParent = (node: T | null): void => {
        this.parent = node;
    };
}

/**
 * Обходит дерево сверху вниз с вызовом коллбека на каждой дочерней ноде.
 * @param node Нода.
 * @param callback Коллбек, если коллбек возвращает false обход дерева прекращается.
 */
export function traverseAbstractTree<VisitorNode extends AbstractTreeNode<VisitorNode>>(
    node: VisitorNode,
    callback: (node: VisitorNode) => boolean
): void {
    const result = callback(node);
    if (result && node.getChildren().length) {
        for (const child of node.getChildren()) {
            traverseAbstractTree<VisitorNode>(child, callback);
        }
    }
}
