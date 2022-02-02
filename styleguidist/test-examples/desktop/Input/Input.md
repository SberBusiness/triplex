```jsx
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Input} from '@sbbol/web-library/desktop/components/Input/Input';
import {useState} from 'react';

const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [value, setValue] = useState('');

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
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <Input placeholder="placeholder" value={value} onChange={(e) => setValue(e.target.value)} error={error} disabled={disabled} />
    </ComponentPreview>
</>;
```
