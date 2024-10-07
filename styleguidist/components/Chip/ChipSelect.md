```jsx
import React, {useState} from 'react';
import {ChipSelect} from '@sberbusiness/triplex/components/Chip';

const optionsSelect = [
    {id: 'chip-select-1', label: 'Создан', value: 'i1'},
    {id: 'chip-select-2', label: 'Отправлен', value: 'i2'},
    {id: 'chip-select-3', label: 'Подписан', value: 'i3'},
    {id: 'chip-select-4', label: 'Ожидает', value: 'i4'},
    {id: 'chip-select-5', label: 'Черновик', value: 'i5'},
];

const [value, setValue] = useState();

<ChipSelect
    value={value}
    options={optionsSelect}
    onChange={setValue}
    clearSelected={() => setValue(undefined)}
    label="Chip name"
/>
```
