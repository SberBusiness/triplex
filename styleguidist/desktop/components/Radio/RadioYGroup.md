```jsx
import React, { useState } from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Radio} from '@sbbol/web-library/desktop/components/Radio/Radio';

const [value, setValue] = useState('first');
const [disabled, setDisabled] = useState(false);

const options = [
    {label: [`Шаблонный текст в 1 или`, <br />, '2-е строки, но не более'], value: 'first'},
    {label: [`Шаблонный текст в 1 или`, <br />, '2-е строки, но не более'], value: 'second'},
    {label: [`Шаблонный текст в 1 или`, <br />, '2-е строки, но не более'], value: 'third'},
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
        <RadioYGroup aria-label="radioygroup">
            {options.map((item, index) => (
                <Radio
                    key={index}
                    name="radioygroup"
                    value={item.value}
                    checked={value === item.value}
                    onChange={(event) => setValue(event.target.value)}
                    data-test-id={`radio${index}`}
                    disabled={disabled}
                >
                    {item.label}
                </Radio>
            ))}
        </RadioYGroup>
    </ComponentPreview>
</>
```
