import * as React from 'react';

/**
 * Свойства TreeViewGroup.
 */
export interface ITreeViewGroupProps extends React.HTMLAttributes<HTMLUListElement> {}

/**
 * Обертка для вложенных TreeNode.
 */
export const TreeViewGroup: React.FC<ITreeViewGroupProps> = ({children, ...props}) => (
    <ul role="group" className="cssClass[treeViewGroup]" {...props}>
        {children}
    </ul>
);

TreeViewGroup.displayName = 'TreeViewGroup';
