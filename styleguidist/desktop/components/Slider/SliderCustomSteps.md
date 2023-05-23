```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Slider"
    isMobileComponent={false}
/>
```

```jsx
import React from 'react';
import {Slider} from '@sberbusiness/triplex/desktop/components/Slider/Slider';
import {ISliderMark} from '../../../../src/desktop/components/Slider/Slider';

const marks = [
    {label: -100, value: -100},
    {label: -50, value: -50},
    {label: 0, value: 0},
    {label: 50, value: 50},
    {label: 100, value: 100},
];

const [value, setValue] = React.useState(50);
const [disabled, setDisabled] = React.useState(false);

<div style={{width: '300px'}}>
    <div>
        <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
    </div>
    <br /><br />
    
    <Slider
        disabled={disabled}
        marks={marks}
        min={-100}
        max={100}
        onChange={setValue}
        step={[-100, -50, 0, 50, 100]}
        value={value}
    />
</div>

```