```jsx
import {Slider} from '@sberbusiness/triplex/components/Slider/Slider';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(0);

const renderTooltip = (value) => <div>{value}</div>;

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
    <Slider
        marks={[{label: 0, value: 0}, {label: 100, value: 100}]}
        min={0}
        max={100}
        onChange={setValue}
        step={1}
        value={value}
        renderTooltipContent={renderTooltip}
    />
</div>
```
