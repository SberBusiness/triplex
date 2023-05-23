```jsx
import React, {useState} from 'react';
import {AmountCurrencySelect} from '@sberbusiness/triplex/desktop/components/AmountCurrencySelect/AmountCurrencySelect';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = useState('');
const [currency, setCurrency] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const [currencyDisabled, setCurrencyDisabled] = useState(false);

const currencyOptions = [
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
];

const renderExampleControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={loading} onChange={(event) => setLoading(event.target.checked)} data-label="Loading" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
        <input type="checkbox" checked={currencyDisabled} onChange={(event) => setCurrencyDisabled(event.target.checked)} data-label="Disabled (currency)" />
    </ExampleControlPanel>
);

<>
    {renderExampleControlPanel()}  
    <AmountCurrencySelect
        value={value}
        onChange={setValue}
        currency={currency}
        currencyProps={{title: currency ? currency.label : undefined, disabled: currencyDisabled}}
        currencyOptions={currencyOptions}
        onSelect={setCurrency}
        loading={loading}
        error={error}
        disabled={disabled}
    />
</>
```
