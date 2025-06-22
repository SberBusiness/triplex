```jsx
const [value, setValue] = React.useState(30);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<>
    <div>value = {value}</div>
    <br />
    <Slider
        value={value}
        marks={marks}
        min={0}
        max={100}
        step={1}
        onChange={setValue}
    />
</>
```

### Disabled state

```jsx
const [value, setValue] = React.useState(30);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<Slider
    value={value}
    marks={marks}
    min={0}
    max={100}
    step={1}
    onChange={setValue}
    disabled
/>
```

### Tooltip

```jsx
const [value, setValue] = React.useState(0);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

const renderTooltip = (value) => <div>{value}</div>;

<Slider
    value={value}
    marks={marks}
    min={0}
    max={100}
    step={1}
    renderTooltipContent={renderTooltip}
    onChange={setValue}
/>
```

### Reversed state

```jsx
const [value, setValue] = React.useState(30);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<>
    <div>value = {value}</div>
    <br />
    <Slider
        value={value}
        marks={marks}
        min={0}
        max={100}
        step={1}
        onChange={setValue}
        reverse
    />
</>
```

### Custom steps

```jsx
const [value, setValue] = React.useState(50);

const marks = [
    {label: -100, value: -100},
    {label: -50, value: -50},
    {label: 0, value: 0},
    {label: 50, value: 50},
    {label: 100, value: 100},
];

<>
    <div>value = {value}</div>
    <br />
    <Slider
        value={value}
        marks={marks}
        min={-100}
        max={100}
        step={[-100, -50, 0, 50, 100]}
        onChange={setValue}
    />
</>
```

### Amount

```jsx
import {range} from 'lodash';

const [value, setValue] = React.useState(1000000);

const amounts =  [
    0,
    10000,
    ...range(20000, 240000, 20000),
    ...range(240000, 1000000, 40000),
    ...range(1000000, 2150000, 50000),
    ...range(2150000, 2600000, 75000),
    ...range(2600000, 3000000, 100000),
    ...range(3000000, 3800000, 200000),
    ...range(3800000, 9000000, 400000),
    ...range(9000000, 10000000, 500000),
    ...range(10000000, 25000000, 2500000),
    ...range(25000000, 40000000, 5000000),
    ...range(40000000, 90000001, 10000000),
    100000000,
];

const marks = [
    {label: '0 млн', value: 0},
    {label: '1 млн', value: 32},
    {label: '3 млн', value: 65},
    {label: '100 млн', value: 99},
];

<>
    <div>{new Intl.NumberFormat('ru-RU').format(value)}</div>
    <br />
    <Slider
        value={amounts.findIndex((v) => value == v)}
        marks={marks}
        min={0}
        max={99}
        step={[...range(0, 100, 1)]}
        onChange={(value) => setValue(amounts[value])}
    />
</> 
```
