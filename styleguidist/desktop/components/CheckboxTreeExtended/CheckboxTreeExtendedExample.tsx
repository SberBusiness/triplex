import React, {useState} from 'react';
import {CheckboxTreeExtended} from '@sberbusiness/triplex/desktop/components/CheckboxTreeExtended/CheckboxTreeExtended';

interface ICheckboxData {
    id: string;
    label: string;
    checked: boolean;
    bulk?: boolean;
    children?: ICheckboxData[];
}

const checkboxesInitial: ICheckboxData[] = [
    {
        id: '1',
        label: 'Группа 1',
        checked: false,
        bulk: false,
        children: [
            {
                id: '1-1',
                label: 'Значение 1-1',
                checked: false,
                bulk: false,
                children: [
                    {
                        id: '1-1-1',
                        label: 'Значение 1-1-1',
                        checked: false,
                    },
                    {
                        id: '1-1-2',
                        label: 'Значение 1-1-2',
                        checked: false,
                    },
                    {
                        id: '1-1-3',
                        label: 'Значение 1-1-3',
                        checked: false,
                    },
                ],
            },
            {
                id: '1-2',
                label: 'Значение 1-2',
                checked: false,
            },
        ],
    },
    {
        id: '2',
        label: 'Группа 2',
        checked: false,
        bulk: false,
        children: [
            {
                id: '2-1',
                label: 'Значение 2-1',
                checked: false,
            },
            {
                id: '2-2',
                label: 'Значение 2-2',
                checked: false,
            },
        ],
    },
    {
        id: '3',
        label: 'Значение 3',
        checked: false,
    },
];

export const CheckboxTreeExtendedExample: React.FC = () => {
    const [checkboxes, setCheckboxes] = useState(checkboxesInitial);

    /**
     * Обход ICheckboxData[].
     */
    const traverseCheckboxes = (checkboxes: ICheckboxData[], cb: (checkbox: ICheckboxData) => void) => {
        checkboxes.forEach((c) => {
            if (c.children) traverseCheckboxes(c.children, cb);
            cb(c);
        });
    };

    // Обновление флага checked и bulk родителя, при изменении дочернего чекбокса.
    const checkParentCheckboxes = (checkbox: ICheckboxData) => {
        if (!checkbox.children) {
            return;
        }

        let checkedChildrenCount = 0;
        let bulkChildrenCount = 0;

        checkbox.children.forEach((c) => {
            c.checked ? checkedChildrenCount++ : '';
            c.bulk ? bulkChildrenCount++ : '';
        });

        // Все дочерние чекбоксы выбраны.
        if (checkedChildrenCount === checkbox.children.length) {
            checkbox.checked = true;
            checkbox.bulk = bulkChildrenCount !== 0;
        } else if (checkedChildrenCount > 0) {
            // Некоторые дочерние чекбоксы выбраны.
            checkbox.checked = true;
            checkbox.bulk = true;
        } else {
            // Все дочерние чекбоксы не выбраны.
            checkbox.checked = false;
        }
    };

    // Обновление флага checked дочерних чекбоксов, при изменении родителя.
    const checkChildrenCheckboxes = (checkbox: ICheckboxData) => {
        if (!checkbox.children) {
            return;
        }

        checkbox.children.forEach((c) => {
            c.checked = checkbox.checked;
            checkChildrenCheckboxes(c);
        });
    };

    const handleChange = (checkbox: ICheckboxData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        checkbox.checked = checkbox.bulk ? true : checked;

        // Обновление флага checked дочерних чекбоксов, при изменении родителя.
        checkChildrenCheckboxes(checkbox);

        // Обновление флага checked и bulk всех чекбоксов снизу вверх.
        traverseCheckboxes(checkboxes, checkParentCheckboxes);

        setCheckboxes([...checkboxes]);
    };

    const renderNode = (checkbox: ICheckboxData) => (
        <CheckboxTreeExtended.Node
            id={checkbox.id}
            key={checkbox.id}
            checkbox={(props) => (
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
