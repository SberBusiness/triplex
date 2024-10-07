```jsx
import React, {useState} from 'react';
import {ChipSuggest} from '@sberbusiness/triplex/components/Chip';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';

const optionsSource = [
    {label: 'Создан', value: 'i1'},
    {label: 'Отправлен', value: 'i2'},
    {label: 'Подписан', value: 'i3'},
    {label: 'Ожидает', value: 'i4'},
    {label: 'Черновик', value: 'i5'},
];

const [value, setValue] = useState();
const [options, setOptions] = useState([]);
const [showNotFound, setShowNotFound] = useState(false);

const handleFocus = () => {
    setOptions(optionsSource);
    setShowNotFound(false);
};

const handleFilter = (query) => {
    const options = optionsSource.filter(({label}) => label.toLowerCase().includes(query.toLowerCase()));

    setOptions(options);
    setShowNotFound(options.length == 0);
};

const handleSelect = (value) => setValue(value);
    
<ChipSuggest
    clearSelected={() => handleSelect(undefined)}
    dropdownHint={showNotFound ? 'Совпадений не найдено.' : ''}
    label="Chip name"
    onFilter={handleFilter}
    onFocus={handleFocus}
    onSelect={handleSelect}
    options={options}
    placeholder="Начните вводить"
    value={value}
/>
```
