```jsx
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);
const [disabled, setDisabled] = React.useState(false);
const [currencyDisabled, setCurrencyDisabled] = React.useState(false);
const [error, setError] = React.useState(false);
const [loading, setLoading] = React.useState(false);

const currencyOptions = [
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
];

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={currencyDisabled} setChecked={setCurrencyDisabled}>
            Disabled (currency)
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={error} setChecked={setError}>
            Error
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={loading} setChecked={setLoading}>
            Loading
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}  
    <AmountCurrencySelect
        value={value}
        currency={currency}
        currencyOptions={currencyOptions}
        currencyProps={{title: currency ? currency.label : undefined, disabled: currencyDisabled}}
        disabled={disabled}
        error={error}
        loading={loading}
        onChange={setValue}
        onSelect={setCurrency}
    />
</>
```
