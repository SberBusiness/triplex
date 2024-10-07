```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-0-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-0-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-0-2', value: 'EUR'},
];

<AmountCurrencySelect
    value={value}
    currency={currency}
    currencyOptions={currencyOptions}
    currencyProps={{title: currency ? currency.label : undefined}}
    onChange={setValue}
    onSelect={setCurrency}
/>
```

### Disabled state

```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-1-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-1-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-1-2', value: 'EUR'},
];

<AmountCurrencySelect
    value={value}
    currency={currency}
    currencyOptions={currencyOptions}
    currencyProps={{title: currency ? currency.label : undefined}}
    onChange={setValue}
    onSelect={setCurrency}
    disabled
/>
```

### Error state

```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-2-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-2-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-2-2', value: 'EUR'},
];

<AmountCurrencySelect
    value={value}
    currency={currency}
    currencyOptions={currencyOptions}
    currencyProps={{title: currency ? currency.label : undefined}}
    onChange={setValue}
    onSelect={setCurrency}
    error
/>
```

### Loading state

```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-3-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-3-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-3-2', value: 'EUR'},
];

<AmountCurrencySelect
    value={value}
    currency={currency}
    currencyOptions={currencyOptions}
    currencyProps={{title: currency ? currency.label : undefined}}
    onChange={setValue}
    onSelect={setCurrency}
    loading
/>
```

### Disabled currency

```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', id: 'amount-currency-select-4-0', value: 'RUB'},
    {label: 'USD', id: 'amount-currency-select-4-1', value: 'USD'},
    {label: 'EUR', id: 'amount-currency-select-4-2', value: 'EUR'},
];

<AmountCurrencySelect
    value={value}
    currency={currency}
    currencyOptions={currencyOptions}
    currencyProps={{title: currency ? currency.label : undefined, disabled: true}}
    onChange={setValue}
    onSelect={setCurrency}
/>
```
