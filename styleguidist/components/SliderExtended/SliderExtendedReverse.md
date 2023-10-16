```jsx
import {SliderExtended} from '@sberbusiness/triplex/components/SliderExtended/SliderExtended';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(30);
const [disabled, setDisabled] = React.useState(false);

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
    <SliderExtended
        disabled={disabled}
        min={0}
        max={100}
        reverse
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
</div>
```
