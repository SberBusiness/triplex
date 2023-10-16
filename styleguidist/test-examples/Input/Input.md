```jsx
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {Input} from '@sberbusiness/triplex/components/Input/Input';

const [value, setValue] = React.useState('');
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);

const checkboxOptions = [
    {
        id: 'disabled',
        label: 'disabled',
        checked: disabled,
        onChange: setDisabled,
    },
    {
        id: 'error',
        label: 'error',
        checked: error,
        onChange: setError,
    },
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
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview>
        <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="placeholder"
            disabled={disabled}
            error={error}
        />
    </ComponentPreview>
</>
```
