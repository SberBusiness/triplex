```jsx
import {SliderExtended} from '@sberbusiness/triplex/components/SliderExtended/SliderExtended';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(0);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Number
            value={value}
            setValue={(value) => setValue(parseInt(value, 10))}
        >
            Value
        </ComponentControlPanel.Number>
    </ComponentControlPanel>
);

<div style={{width: '300px'}}>
    {renderControlPanel()}
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
</div>
```
