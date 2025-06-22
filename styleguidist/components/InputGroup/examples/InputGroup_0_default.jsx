import React, {useState} from 'react';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import './style.less';

const options = Array(5)
    .fill()
    .map((item, index) => ({id: index.toString(), value: index + 1, label: `Option ${index + 1}`}));

const renderInput = () => <Input placeholder="Введите значение" />;

const renderSelect = () => {
    const [value, setValue] = useState();

    return (
        <Select value={value} placeholder="Выберите значение" options={options} onChange={setValue} />
    );
};

<InputGroup className="input-group-wrapper">
    {renderInput()}
    {renderSelect()}
</InputGroup>