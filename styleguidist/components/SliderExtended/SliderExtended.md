```jsx
const [value, setValue] = React.useState(30);

<>
    <div>value = {value}</div>
    <br />
    <SliderExtended
        min={0}
        max={100}
        step={1}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={setValue} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
            <SliderExtended.Mark value={30}>30</SliderExtended.Mark>
            <SliderExtended.Mark value={70}>70</SliderExtended.Mark>
            <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
        </SliderExtended.Marks>
    </SliderExtended>
</>
```

### Disabled state

```jsx
const [value, setValue] = React.useState(30);

<SliderExtended
    min={0}
    max={100}
    step={1}
    disabled
>
    <SliderExtended.Rail />
    <SliderExtended.Dot value={value} onChange={setValue} />
    <SliderExtended.Track />
    <SliderExtended.Marks>
        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
        <SliderExtended.Mark value={30}>30</SliderExtended.Mark>
        <SliderExtended.Mark value={70}>70</SliderExtended.Mark>
        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
    </SliderExtended.Marks>
</SliderExtended>
```

### Tooltip

```jsx
const [value, setValue] = React.useState(0);

<SliderExtended
    min={0}
    max={100}
    step={1}
>
    <SliderExtended.Rail />
    <SliderExtended.Dot value={value} onChange={setValue}>
        <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
    </SliderExtended.Dot>
    <SliderExtended.Track />
    <SliderExtended.Marks>
        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
    </SliderExtended.Marks>
</SliderExtended>
```

### Reversed state

```jsx
const [value, setValue] = React.useState(30);

<>
    <div>value = {value}</div>
    <br />
    <SliderExtended
        min={0}
        max={100}
        step={1}
        reverse
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={setValue} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
            <SliderExtended.Mark value={30}>30</SliderExtended.Mark>
            <SliderExtended.Mark value={70}>70</SliderExtended.Mark>
            <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
        </SliderExtended.Marks>
    </SliderExtended>
</>
```

### Custom steps

```jsx
const [value, setValue] = React.useState(0);

<>
    <div>value = {value}</div>
    <br />
    <SliderExtended
        min={-100}
        max={100}
        step={[-100, -50, 0, 50, 100]}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={setValue} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            {[-100, -50, 0, 50, 100].map(v => <SliderExtended.Mark key={v} value={v}>{v}</SliderExtended.Mark>)}
        </SliderExtended.Marks>
    </SliderExtended>
</>
```

### Amount

```jsx
import range from 'lodash.range';

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

<>
    <div>{new Intl.NumberFormat('ru-RU').format(value)}</div>
    <br />
    <SliderExtended
        min={0}
        max={99}
        step={[...range(0, 100, 1)]}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={amounts.findIndex((v) => value === v)} onChange={(value) => setValue(amounts[value])} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            <SliderExtended.Mark value={0}>0 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={32}>1 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={65}>3 млн</SliderExtended.Mark>
            <SliderExtended.Mark value={99}>100 млн</SliderExtended.Mark>
        </SliderExtended.Marks>
    </SliderExtended>
</>
```

### Range

```jsx
const [value1, setValue1] = React.useState(30);
const [value2, setValue2] = React.useState(70);

<>
    <div>value1 = {value1}</div>
    <div>value2 = {value2}</div>
    <br />
    <SliderExtended
        min={0}
        max={100}
        step={1}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value1} onChange={setValue1} />
        <SliderExtended.Track />
        <SliderExtended.Dot value={value2} onChange={setValue2} />
        <SliderExtended.Marks>
            <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
            <SliderExtended.Mark value={30}>30</SliderExtended.Mark>
            <SliderExtended.Mark value={70}>70</SliderExtended.Mark>
            <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
        </SliderExtended.Marks>
    </SliderExtended>
</>
```

### Range disabled

```jsx
const [value1, setValue1] = React.useState(30);
const [value2, setValue2] = React.useState(70);

<SliderExtended
    min={0}
    max={100}
    step={1}
    disabled
>
    <SliderExtended.Rail />
    <SliderExtended.Dot value={value1} onChange={setValue1} />
    <SliderExtended.Track />
    <SliderExtended.Dot value={value2} onChange={setValue2} />
    <SliderExtended.Marks>
        <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
        <SliderExtended.Mark value={30}>30</SliderExtended.Mark>
        <SliderExtended.Mark value={70}>70</SliderExtended.Mark>
        <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
    </SliderExtended.Marks>
</SliderExtended>
```
