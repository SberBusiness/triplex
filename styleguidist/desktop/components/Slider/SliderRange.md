```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {SliderRange} from '@sberbusiness/triplex/desktop/components/Slider/SliderRange';

const [values, setValues] = React.useState([30, 50]);
const [disabled, setDisabled] = React.useState(false);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

<div style={{width: '300px'}}>
    <div>
        <div>
            <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
            <label><input type="number" value={values[0]} onChange={(e) => setValues(prevValues => [parseInt(e.target.value, 10), prevValues[1]])} /> </label><br />
            <label><input type="number" value={values[1]} onChange={(e) => setValues(prevValues => [prevValues[0], parseInt(e.target.value, 10)])} /> </label>
        </div>
        <br /><br />
    </div>

    <SliderRange
        disabled={disabled}
        marks={marks}
        min={0}
        max={100}
        onChange={setValues}
        step={1}
        values={values}
    />
</div>
```