```jsx
import React, { useState } from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';

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

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />
    <ComponentPreview>
        <CheckboxXGroup indent={12} aria-label="checkboxxgroup">
            {options.map((item, index) => (
                <Checkbox key={index} name="checkboxxgroup" value={item.value} data-test-id={`checkbox${index}`} disabled={disabled}>
                    {item.label}
                </Checkbox>
            ))}
        </CheckboxXGroup>
    </ComponentPreview>
</>
```