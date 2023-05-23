```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {Slider} from '@sberbusiness/triplex/desktop/components/Slider/Slider';

const [value, setValue] = React.useState(30);
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
            <label><input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} /> </label>
        </div>
        <br /><br />
    </div>

    <Slider
        disabled={disabled}
        marks={marks}
        min={0}
        max={100}
        onChange={setValue}
        step={1}
        value={value}
    />
</div>
```