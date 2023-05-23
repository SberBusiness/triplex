```jsx
import React, { useState } from 'react';
import {CheckboxYGroup} from '@sberbusiness/triplex/desktop/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {MobileOptionsWrapper} from '../../common/MobileOptionsWrapper/MobileOptionsWrapper';

const [state, setState] = useState({
    disabled: false,
    error: false,
    value: ''
});

const options = [
    {
        label: 'Disabled',
        checked: state.disabled,
        onChange: (e) => setState({...state, disabled: e.target.checked})
    }, {
        label: 'Error',
        checked: state.error,
        onChange: (e) => setState({...state, error: e.target.checked})
    }
];

<>
    <MobileOptionsWrapper>
        <CheckboxYGroup>
            {options.map((item, index) => (
                <Checkbox key={index} onChange={item.onChange}>{item.label}</Checkbox>
            ))}
        </CheckboxYGroup>
    </MobileOptionsWrapper>

    <Input 
        disabled={state.disabled} 
        error={state.error} 
        value={state.value} 
        onChange={(e) => setState({...state, value: e.target.value})} 
        placeholder={'Введите значение'}
    />
</>
```