```jsx
import {SliderRange} from '@sberbusiness/triplex/components/Slider/SliderRange';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [values, setValues] = React.useState([30, 50]);
const [disabled, setDisabled] = React.useState(false);

const marks = [
    {label: 0, value: 0},
    {label: 30, value: 30},
    {label: 70, value: 70},
    {label: 100, value: 100},
];

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Number
            value={values[0]}
            setValue={(value) => setValues(prevState => [parseInt(value, 10), prevState[1]])}
        >
            Left
        </ComponentControlPanel.Number>
        <ComponentControlPanel.Number
            value={values[1]}
            setValue={(value) => setValues(prevState => [prevState[1], parseInt(value, 10)])}
        >
            Right
        </ComponentControlPanel.Number>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<div style={{width: '300px'}}>
    {renderControlPanel()}
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
