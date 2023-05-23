```jsx
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import React, {useState} from 'react';
import {CheckboxTree} from '@sberbusiness/triplex/desktop/components/CheckboxTree/CheckboxTree';

const checkboxesInitial = [
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

const [checkboxes, setCheckboxes] = useState(checkboxesInitial);

<>
    <ComponentPreview>
        <CheckboxTree checkboxes={checkboxes} onChange={setCheckboxes} />
    </ComponentPreview>
</>
```
