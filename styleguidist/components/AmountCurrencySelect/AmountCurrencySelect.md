```jsx
const [value, setValue] = React.useState('');
const [currency, setCurrency] = React.useState(null);

const currencyOptions = [
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
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
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
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
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
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
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
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
    {label: 'RUB', value: 'RUB'},
    {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'},
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
