```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {SliderExtended} from '@sberbusiness/triplex/desktop/components/SliderExtended/SliderExtended';

const [value, setValue] = React.useState(30);
const [disabled, setDisabled] = React.useState(false);

<div style={{width: '300px'}}>
    <div>
        <div>
            <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
            <label><input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} /> </label>
        </div>
        <br /><br />
    </div>
    
    <SliderExtended
        disabled={disabled}
        min={0}
        max={100}
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