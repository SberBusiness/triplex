```jsx
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {SliderExtended} from '@sberbusiness/triplex/desktop/components/SliderExtended/SliderExtended';

const [value, setValue] = React.useState(30);
const [disabled, setDisabled] = React.useState(false);

const checkboxOptions = [
   {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    }
];

const inputOptions = [
    {
        id: 'value',
        hidden: true,
        value: value,
        onChange: setValue,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />

    <ComponentPreview style={{padding: '20px'}}>
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
                <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
            </SliderExtended.Marks>
        </SliderExtended>
    </ComponentPreview>
</>
```

```jsx
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import {SliderExtendedRangeExample} from './SliderExtendedRangeExample';

const [disabled, setDisabled] = React.useState(false);

const checkboxOptions = [
   {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    }
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />
    
    <ComponentPreview style={{padding: '20px'}}>
        <SliderExtendedRangeExample disabled={disabled} />
    </ComponentPreview>
</>
```