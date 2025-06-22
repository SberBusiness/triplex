import React, {useState} from 'react';
import {Suggest} from '@sberbusiness/triplex/components/Suggest/Suggest';
import {NumberInput} from '@sberbusiness/triplex/components/NumberInput/NumberInput';
import './style.less';

const options = Array(5)
    .fill()
    .map((item, index) => ({value: index + 1, label: `Option ${index + 1}`}));

const renderSuggest = () => {
    const [state, setState] = useState({options});

    const handleFilter = (string) =>
        setState({
            ...state,
            options: options.filter(
                (option) => option.label.toLowerCase().indexOf(string.toLowerCase()) != -1
            ),
        });

    return (
        <Suggest
            value={state.value}
            placeholder="Начните вводить"
            tooltipHint="Совпадений не найдено."
            options={options}
            isTooltipOpened={!state.options.length}
            onFilter={handleFilter}
            onSelect={(value) => setState({...state, value, options})}
        />
    );
};

const renderNumberInput = () => {
    return <NumberInput placeholder="Введите значение" />;
};

<InputGroup className="input-group-wrapper">
    {renderSuggest()}
    {renderNumberInput()}
</InputGroup>