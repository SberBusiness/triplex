```jsx
const [value, setValue] = React.useState('');

const maxLength = 24;
const fractionLength = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxLength={maxLength}
    fractionLength={fractionLength}
    currency={currency}
    onChange={setValue}
/>
```

### Disabled state

```jsx
const [value, setValue] = React.useState('');

const maxLength = 24;
const fractionLength = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxLength={maxLength}
    fractionLength={fractionLength}
    currency={currency}
    onChange={setValue}
    disabled
/>
```

### Error state

```jsx
const [value, setValue] = React.useState('');

const maxLength = 24;
const fractionLength = 2;
const currency = 'RUB';

<AmountInput
    value={value}
    maxLength={maxLength}
    fractionLength={fractionLength}
    currency={currency}
    onChange={setValue}
    error
/>
```
