```jsx
import {SliderExtended} from '@sberbusiness/triplex/components/SliderExtended/SliderExtended';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value1, setValue1] = React.useState(30);
const [value2, setValue2] = React.useState(70);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Number value={value1} setValue={setValue1}>
            First
        </ComponentControlPanel.Number>
        <ComponentControlPanel.Number value={value2} setValue={setValue2}>
            Second
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
</div>
```
