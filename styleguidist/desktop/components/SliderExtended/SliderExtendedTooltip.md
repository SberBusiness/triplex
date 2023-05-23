```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {SliderExtended} from '@sberbusiness/triplex/desktop/components/SliderExtended/SliderExtended';

const [value, setValue] = React.useState(0);

<div style={{width: '300px'}}>
    <div style={{marginBottom: '24px'}}>
        <label><input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} /> </label>
    </div>

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