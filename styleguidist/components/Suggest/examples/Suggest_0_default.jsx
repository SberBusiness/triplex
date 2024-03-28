import React, {useState} from 'react';
import {Suggest} from "@sberbusiness/triplex/components/Suggest/Suggest";

const [value, setValue] = useState();
const [options, setOptions] = useState([]);
const [isTooltipOpened, setIsTooltipOpened] = useState(false);

const data = [
    {
        value: '1',
        label: 'Анапсиды',
        labelReactNode: (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>Анапсиды</div>
                <div>0001231</div>
            </div>
        ),
    },
    {value: '2', label: 'Синапсиды'},
    {value: '3', label: 'Диапсиды'},
    {value: '4', label: 'В кладистике нет настолько длинных названий отрядов/подотрядов, чтобы вылезать за границы дозволенного'},
];

const handleFocus = () => {
    setOptions(data);
    setIsTooltipOpened(false);
};

const handleFilter = (query) => {
    const options = data.filter(({label}) => label.toLowerCase().includes(query.toLowerCase()));

    setOptions(options);
    setIsTooltipOpened(options.length == 0);
};

const handleSelect = (value) => {
    setValue(value);
};

<Suggest
    value={value}
    options={options}
    placeholder="Начните вводить"
    tooltipHint="Совпадений не найдено."
    data-test-id="suggest"
    onFocus={handleFocus}
    onFilter={handleFilter}
    onSelect={handleSelect}
    isTooltipOpened={isTooltipOpened}
    saveFilterOnFocus={false}
/>