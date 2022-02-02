```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [disabled, setDisabled] = useState(false)

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
        <Checkbox disabled={disabled}>
            Текст в 1 строку
        </Checkbox>
    </ComponentPreview>
</>
```