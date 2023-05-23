```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import {Slider} from '@sberbusiness/triplex/desktop/components/Slider/Slider';

const [value, setValue] = React.useState(0);

const renderTooltip = (value) => <div>{value}</div>;

<div style={{width: '300px'}}>
    <div style={{marginBottom: "24px"}}>
        <label><input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} /></label>
    </div>

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