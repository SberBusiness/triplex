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
const [disabled, setDisabled] = React.useState(false);

<div style={{width: '300px'}}>
    <div>
        <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
    </div>
    <br /><br />
    
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