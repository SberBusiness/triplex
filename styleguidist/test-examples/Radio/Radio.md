```jsx noeditor
import React, {useRef, useState, useEffect} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {Radio} from '@sberbusiness/triplex/components/Radio/Radio';

const ref = useRef(null);

const [checked, setChecked] = useState(false);
const [focused, setFocused] = useState(false);
const [disabled, setDisabled] = useState(false);

useEffect(() => {
    if (focused) ref.current.focus();
}, [focused]);

const checkboxOptions = [
    {
        id: 'checked',
        label: 'Checked',
        checked: checked,
        onChange: setChecked,
    },
    {
        id: 'focused',
        label: 'Focused',
        checked: focused,
        onChange: setFocused,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const handleChange = (event) => setChecked(event.target.checked);

<>
    <ComponentOptions checkboxOptions={checkboxOptions}/>
    <ComponentPreview>
        <Radio checked={checked} onChange={handleChange} disabled={disabled} ref={ref}>
            Sample Text
        </Radio>
    </ComponentPreview>
</>
```
