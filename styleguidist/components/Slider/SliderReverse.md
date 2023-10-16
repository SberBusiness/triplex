```jsx
import {Slider} from '@sberbusiness/triplex/components/Slider/Slider';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(30);
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
            value={value}
            setValue={(value) => setValue(parseInt(value, 10))}
        >
            Value
        </ComponentControlPanel.Number>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<div style={{width: '300px'}}>
    {renderControlPanel()}
    <Slider
        reverse
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
