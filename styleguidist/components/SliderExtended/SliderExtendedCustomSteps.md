```jsx
import {SliderExtended} from '@sberbusiness/triplex/components/SliderExtended/SliderExtended';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState(0);
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
        min={-100}
        max={100}
        step={[-100, -50, 0, 50, 100]}
    >
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={setValue} />
        <SliderExtended.Track />
        <SliderExtended.Marks>
            {[-100, -50, 0, 50, 100].map(v => <SliderExtended.Mark key={v} value={v}>{v}</SliderExtended.Mark>)}
        </SliderExtended.Marks>
    </SliderExtended>
</div>
```
