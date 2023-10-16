import React from 'react';
import {CollapsableTree, ICollapsableTreeProps} from '@sberbusiness/triplex/components/CollapsableTree/CollapsableTree';
import {CheckboxTreeExtendedNode} from '@sberbusiness/triplex/components/CheckboxTreeExtended/components/CheckboxTreeExtendedNode';
import {CheckboxTreeExtendedCheckbox} from '@sberbusiness/triplex/components/CheckboxTreeExtended/components/CheckboxTreeExtendedCheckbox';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

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
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = ({className, ...rest}) => (
    <CollapsableTree className={classnames('cssClass[checkboxTreeExtended]', className)} {...rest} />
);

CheckboxTreeExtended.displayName = 'CheckboxTreeExtended';
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
