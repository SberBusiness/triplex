import * as React from 'react';
import {
    CheckboxTreeExtended,
    ICheckboxTreeExtendedProps,
} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/CheckboxTreeExtended';
import {ICheckboxTreeExtendedCheckboxProvideProps} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/components/CheckboxTreeExtendedNode';
import {ICheckboxTreeCheckboxData} from './types';
import {checkChildrenCheckboxes, checkParentCheckboxes, traverseCheckboxes} from './utils';

/** Свойства CheckboxTree. */
export interface ICheckboxTreeProps extends Omit<ICheckboxTreeExtendedProps, 'children' | 'onChange'> {
    children?: never;
    /** Набор чекбоксов. */
    checkboxes: ICheckboxTreeCheckboxData[];
    /** Обработчик изменения чекбоксов. */
    onChange: (options: ICheckboxTreeCheckboxData[]) => void;
}

/**
 * Дерево чекбоксов.
 * Является оберткой над CheckboxTreeExtended.
 */
export const CheckboxTree: React.FC<ICheckboxTreeProps> = ({checkboxes, onChange}) => {
    const handleChange = (checkbox: ICheckboxTreeCheckboxData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        checkbox.checked = checkbox.bulk ? true : checked;

        // Обновление флага checked дочерних чекбоксов, при изменении родителя.
        checkChildrenCheckboxes(checkbox);

        // Обновление флага checked и bulk всех чекбоксов снизу вверх.
        traverseCheckboxes(checkboxes, checkParentCheckboxes);

        onChange([...checkboxes]);
    };

    const renderNode = (checkbox: ICheckboxTreeCheckboxData) => (
        <CheckboxTreeExtended.Node
            id={checkbox.id}
            key={checkbox.id}
            checkbox={(props: ICheckboxTreeExtendedCheckboxProvideProps) => (
                <CheckboxTreeExtended.Checkbox {...props} onChange={handleChange(checkbox)} bulk={checkbox.bulk} checked={checkbox.checked}>
                    {checkbox.label}
                </CheckboxTreeExtended.Checkbox>
            )}
        >
            {checkbox.children && checkbox.children.map(renderNode)}
        </CheckboxTreeExtended.Node>
    );

    return <CheckboxTreeExtended>{checkboxes.map((checkbox) => renderNode(checkbox))}</CheckboxTreeExtended>;
};

CheckboxTree.displayName = 'CheckboxTree';
