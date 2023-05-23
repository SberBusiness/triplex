```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {SliderExtended} from '@sberbusiness/triplex/desktop/components/SliderExtended/SliderExtended';

const [value1, setValue1] = React.useState(30);
const [value2, setValue2] = React.useState(70);
const [disabled, setDisabled] = React.useState(false);

<div style={{width: '300px'}}>
    <div>
        <div>
            <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
            Первое значение: {value1} <br />
            Второе значение: {value2}
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