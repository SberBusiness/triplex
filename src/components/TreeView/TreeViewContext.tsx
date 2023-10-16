import React from 'react';
import {TreeViewAbstractNode} from '@sberbusiness/triplex/components/TreeView/TreeViewAbstractNode';

/**
 * Возвращает AbstractNode по id.
 */
export type TTreeViewContextGetNode = (nodeId: string) => TreeViewAbstractNode | undefined;

/**
 * Добавляет AbstractNode в AbstractTree. AbstractTree является AbstractNode.
 */
export type TTreeViewContextRegisterNode = (
    node: TreeViewAbstractNode,
    parentNode: TreeViewAbstractNode,
    prevNode?: TreeViewAbstractNode,
    nextNode?: TreeViewAbstractNode
) => void;

/**
 * Удаляет AbstractNode из AbstractTree.
 */
export type TTreeViewContextRemoveNode = (node: TreeViewAbstractNode) => void;

/**
 * Устанавливает флаг активности AbstractNode.
 */
export type TTreeViewContextSetActiveNode = (node: TreeViewAbstractNode, active: boolean) => void;

/**
 * Устанавливает флаг opened AbstractNode.
 */
export type TTreeViewContextSetOpenedNode = (node: TreeViewAbstractNode, opened: boolean) => void;

/**
 * Контекст TreeView.
 *
 * @param {number} updateCount - Число обновлений абстрактного дерева. Используется для индикации изменения дерева т.к. изменение мутируемого объекта rootNode не вызывает триггер изменения контекста.
 * @param {TTreeViewContextGetNode} getNode - Возвращает TreeViewAbstractNode по id.
 * @param {TreeViewAbstractNode} parentNode - Родительская TreeViewAbstractNode.
 * @param {TreeViewAbstractNode | null} rootNode - Рутовая нода абстрактного дерева.
 * @param {TTreeViewContextRegisterNode} registerNode - Добавляет TreeViewAbstractNode в AbstractTree. AbstractTree также является AbstractNode.
 * @param {TTreeViewContextSetActiveNode} setActiveNode - Устанавливает флаг активности AbstractNode.
 * @param {TTreeViewContextSetOpenedNode} setOpenedNode - Устанавливает флаг раскрытости AbstractNode.
 */
export interface ITreeViewContext {
    updateCount: number;
    getNode: TTreeViewContextGetNode;
    parentNode: TreeViewAbstractNode;
    rootNode: TreeViewAbstractNode | null;
    registerNode: TTreeViewContextRegisterNode;
    removeNode: TTreeViewContextRemoveNode;
    setActiveNode: TTreeViewContextSetActiveNode;
    setOpenedNode: TTreeViewContextSetOpenedNode;
}

// Начальное значение контекста. Здесь нужно только для типизации и будет заполнено в @sberbusiness/triplex/components/TreeView/TreeView.tsx.
export const initialTreeContext = {
    updateCount: 0,
    rootNode: null,
    parentNode: new TreeViewAbstractNode({id: 'contextNode'}),
    /* eslint-disable @typescript-eslint/no-empty-function */
    getNode: (): TreeViewAbstractNode | undefined => undefined,
    registerNode: (): void => {},
    removeNode: (): void => {},
    setActiveNode: (): void => {},
    setOpenedNode: (): void => {},
    /* eslint-enable @typescript-eslint/no-empty-function */
};

export const TreeViewContext = React.createContext<ITreeViewContext>(initialTreeContext);

/**
 * Свойства контекста, добавляемые WithTreeViewContext.
 */
export interface IWithTreeViewContextProps {
    treeViewContext: ITreeViewContext;
}

/**
 * HOC, предоставляющий TreeViewContext.
 */
export function withTreeViewContext<T extends IWithTreeViewContextProps>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof IWithTreeViewContextProps>> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithTreeViewContext = (props: Omit<T, keyof IWithTreeViewContextProps>) => (
        <TreeViewContext.Consumer>{(context) => <WrappedComponent {...(props as T)} treeViewContext={context} />}</TreeViewContext.Consumer>
    );

    ComponentWithTreeViewContext.displayName = `WithTreeViewContext(${displayName})`;

    return ComponentWithTreeViewContext;
}
