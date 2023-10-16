```jsx noeditor
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {SegmentedControlExample} from './SegmentedControlExample';


const [disabled, setDisabled] = React.useState(false);
const [title, setTitle] = React.useState('Сегмент');
const [value, setValue] = React.useState(['1']);

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
        id: 'segmentTitle',
        hidden: true,
        onChange: setTitle,
        value: title,
    }, {
        id: 'selectedValue',
        hidden: true,
        onChange: (v) => setValue(v.split(',')),
        value: value.join(','),
    }
];

const segments = [
    {value: '1', title},
    {value: '2', title},
    {value: '3', title},
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview>
        <SegmentedControlExample
            disabled={disabled}
            onSelect={setValue}
            segments={segments}
            value={value}
        />
    </ComponentPreview>
</>;
```
