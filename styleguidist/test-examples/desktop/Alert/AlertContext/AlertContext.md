```jsx
import React, {useState} from 'react';
import ComponentOptions from '../../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../../common/components/ComponentPreview/ComponentPreview';
import {AlertContext} from '@sberbusiness/triplex/desktop/components/Alert/AlertContext/AlertContext';

const [type, setType] = useState('info');

const inputOptions = [
    {
        id: 'type',
        label: 'Type',
        onChange: setType,
        value: type,
    },
];

<>
    <ComponentOptions inputOptions={inputOptions} />
    <ComponentPreview>
        <AlertContext type={type}>Sample Text</AlertContext>
    </ComponentPreview>
</>
```
