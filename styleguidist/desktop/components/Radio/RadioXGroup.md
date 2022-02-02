```jsx
import React, { useState } from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Radio} from '@sbbol/web-library/desktop/components/Radio/Radio';

const [value, setValue] = useState('first');
const [disabled, setDisabled] = useState(false);

const options = [
    {label: 'Текст в 1 строку', value: 'first'},
    {label: 'Текст в 1 строку', value: 'second'},
    {label: 'Текст в 1 строку', value: 'third'},
];

const checkboxOptions = [
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const inputOptions = [
    {
        id: 'value',
        hidden: true,
        value,
        onChange: setValue,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview>
        <RadioXGroup indent={12} aria-label="radioxgroup">
            {options.map((item, index) => (
                <Radio
                    key={index}
                    name="radioxgroup"
                    value={item.value}
                    checked={value === item.value}
                    onChange={(event) => setValue(event.target.value)}
                    data-test-id={`radio${index}`}
                    disabled={disabled}
                >
                    {item.label}
                </Radio>
            ))}
        </RadioXGroup>
    </ComponentPreview>
</>
```
