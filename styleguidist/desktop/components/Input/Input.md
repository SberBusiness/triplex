```jsx
import React, { useState } from 'react'; 
import {Input} from '@sbbol/web-library/desktop/components/Input/Input';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [state, setState] = useState({
    disabled: false,
    error: false,
    value: '',
});

const checkboxOptions = [
    {
        id: 'error',
        label: 'Error',
        checked: state.error,
        onChange: (checked) => setState(prevState => ({...prevState, error: checked}))
    }, {
        id: 'disabled',
        label: 'Disabled',
        checked: state.disabled,
        onChange: (checked) => setState(prevState => ({...prevState, disabled: checked}))
    }
];

const inputOptions = [
    {
        id: 'value',
        hidden: true,
        onChange: (value) => setState(prevState => ({...prevState, value})),
        value: state.value,
    }
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    
    <ComponentPreview>
        <Input 
            disabled={state.disabled} 
            error={state.error} 
            value={state.value} 
            onChange={(e) => setState({...state, value: e.target.value})} 
        />
    </ComponentPreview>
</>
```