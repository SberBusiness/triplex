```jsx
const [value, setValue] = React.useState('');

const maxIntegerDigits = 16;
const fractionDigits = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxIntegerDigits={maxIntegerDigits}
    fractionDigits={fractionDigits}
    currency={currency}
    onChange={setValue}
/>
```

### Disabled state

```jsx
const [value, setValue] = React.useState('');

const maxIntegerDigits = 16;
const fractionDigits = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxIntegerDigits={maxIntegerDigits}
    fractionDigits={fractionDigits}
    currency={currency}
    onChange={setValue}
    disabled
/>
```

### Error state

```jsx
const [value, setValue] = React.useState('');

const maxIntegerDigits = 16;
const fractionDigits = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxIntegerDigits={maxIntegerDigits}
    fractionDigits={fractionDigits}
    currency={currency}
    onChange={setValue}
    error
/>
```
