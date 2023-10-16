```jsx noeditor
import React, {useRef, useState, useEffect} from 'react';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';
import {Checkbox} from '@sberbusiness/triplex/components/Checkbox/Checkbox';

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
        <Checkbox checked={checked} onChange={handleChange} disabled={disabled} ref={ref}>
            Sample Text
        </Checkbox>
    </ComponentPreview>
</>
```
