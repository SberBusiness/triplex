```jsx
import {Slider, ISliderMark} from '@sberbusiness/triplex/components/Slider/Slider';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(50);
const [disabled, setDisabled] = React.useState(false);

const marks = [
    {label: -100, value: -100},
    {label: -50, value: -50},
    {label: 0, value: 0},
    {label: 50, value: 50},
    {label: 100, value: 100},
];

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<div style={{width: '300px'}}>
    {renderControlPanel()}
    <Slider
        disabled={disabled}
        marks={marks}
        min={-100}
        max={100}
        onChange={setValue}
        step={[-100, -50, 0, 50, 100]}
        value={value}
    />
</div>

```
