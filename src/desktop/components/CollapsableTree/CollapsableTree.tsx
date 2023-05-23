import * as React from 'react';
import {ITreeViewProps, TreeView} from '@sberbusiness/triplex/desktop/components/TreeView/TreeView';
import {CollapsableTreeNode} from '@sberbusiness/triplex/desktop/components/CollapsableTree/components/CollapsableTreeNode';

/**
 * Свойства CollapsableTree.
 *
 */
export interface ICollapsableTreeProps extends ITreeViewProps {}

export interface ICollapsableTreeSFC extends React.FC<ICollapsableTreeProps> {
    Node: typeof CollapsableTreeNode;
}

/**
 * Дерево, ноды которого могут сворачиваться/разворачиваться.
 * Является оберткой TreeView.
 */
const CollapsableTree: ICollapsableTreeSFC = (props) => <TreeView {...props} />;

CollapsableTree.displayName = 'CollapsableTree';
CollapsableTree.Node = CollapsableTreeNode;

export {CollapsableTree};
