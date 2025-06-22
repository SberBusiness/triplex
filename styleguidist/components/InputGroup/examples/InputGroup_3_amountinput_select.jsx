import React, {useState} from 'react';
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {CurrencySrvIcon20} from '@sberbusiness/icons/CurrencySrvIcon20';
import './style.less';

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-option-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-option-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-option-2', value: 'EUR'},
];

const renderAmountInput = () => {
    const [value, setValue] = useState('');

    return <AmountInput value={value} onChange={setValue} />;
};

const renderSelect = () => {
    const [value, setValue] = useState();

    return (
        <Select
            value={value}
            placeholder={<CurrencySrvIcon20 className="currency-icon" />}
            options={currencyOptions}
            onChange={setValue}
            className="currency-select"
        />
    );
};

<InputGroup className="input-group-wrapper">
    {renderAmountInput()}
    {renderSelect()}
</InputGroup>