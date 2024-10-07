Элемент подсвечивается, если выбранное значение(value) отлично от свойства defaultValue.

```jsx
import React, {useState} from 'react';
import {ChipSort} from '@sberbusiness/triplex/components/Chip';
import {ISelectBaseOption} from '@sberbusiness/triplex/components/SelectBase/SelectBase';

const options = [
    {id: 'chip-sort-1', label: 'По дате', value: 'i1'},
    {id: 'chip-sort-2', label: 'По времени', value: 'i2'},
];

const [value, setValue] = useState(options[0]);

<ChipSort defaultValue={options[0]} value={value} options={options} onChange={setValue} />;
```
