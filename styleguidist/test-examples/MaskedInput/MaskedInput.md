```jsx
import React, {useState, useEffect, useRef} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

const [value, setValue] = useState('');
const [focused, setFocused] = useState(false);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);
const ref = useRef();

useEffect(() => {
    if (focused) {
        ref.current.focus();
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'focused',
        label: 'focused',
        checked: focused,
        onChange: setFocused,
    },
    {
        id: 'error',
        label: 'error',
        checked: error,
        onChange: setError,
    },
    {
        id: 'disabled',
        label: 'disabled',
        checked: disabled,
        onChange: setDisabled,
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
        <MaskedInput
            value={value}
            mask={MaskedInput.presets.masks.phone}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            forwardRef={ref}
            error={error}
            disabled={disabled}/>
    </ComponentPreview>
</>
```
