```jsx
import React, {useState, useEffect} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {InputGroup} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {NumberInput} from '@sberbusiness/triplex/components/NumberInput/NumberInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {Select} from '@sberbusiness/triplex/components/Select/Select';

const [index, setIndex] = useState(0);

const permutations = [
    ['A', 'B', 'C', 'D'],
    ['D', 'A', 'B', 'C'],
    ['C', 'D', 'A', 'B'],
    ['B', 'C', 'D', 'A'],
];

const options = Array(5).fill().map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

const getComponent = (char, key) => {
    const [value, setValue] = useState('');
    const mask = MaskedInput.presets.masks.phone;

    if (char === 'A')
        return <Input key={key} placeholder="Введите значение" />;
    if (char === 'B')
        return <NumberInput key={key} value={value} onChange={setValue} />;
    if (char === 'C')
        return <MaskedInput key={key} value={value} onChange={(e) => {setValue(e.target.value)}} mask={mask} />;
    if (char === 'D')
        return <Select key={key} placeholder="Выберите значение" options={options} />;
};

const inputOptions = [
    {
        id: 'index',
        hidden: true,
        onChange: setIndex,
        value: index,
    },
];

<>
    <ComponentOptions inputOptions={inputOptions} />
    <ComponentPreview>
        <InputGroup>
            {permutations[index].map((char, key) => getComponent(char, key))}
        </InputGroup>
    </ComponentPreview>
</>
```
