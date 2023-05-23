import * as React from 'react';
import {CollapsableTree, ICollapsableTreeProps} from '@sberbusiness/triplex/desktop/components/CollapsableTree/CollapsableTree';
import {CheckboxTreeExtendedNode} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/components/CheckboxTreeExtendedNode';
import {CheckboxTreeExtendedCheckbox} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/components/CheckboxTreeExtendedCheckbox';

/** Свойства CheckboxTreeExtended. */
export interface ICheckboxTreeExtendedProps extends ICollapsableTreeProps {}

export interface ICheckboxTreeExtendedSFC extends React.FC<ICheckboxTreeExtendedProps> {
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsableTree.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = (props) => <CollapsableTree {...props} />;

CheckboxTreeExtended.displayName = 'CheckboxTreeExtended';
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
