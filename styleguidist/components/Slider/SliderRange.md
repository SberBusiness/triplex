```jsx
const [values, setValues] = React.useState([30, 50]);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<>
    <div>values = {`[${values[0]}, ${values[1]}]`}</div>
    <br />
    <SliderRange
        values={values}
        marks={marks}
        min={0}
        max={100}
        step={1}
        onChange={setValues}
    />
</>
```

### Disabled state

```jsx
const [values, setValues] = React.useState([30, 50]);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<SliderRange
    values={values}
    marks={marks}
    min={0}
    max={100}
    step={1}
    onChange={setValues}
    disabled
/>
```
