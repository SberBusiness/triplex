```jsx
import React, { useState } from 'react';
import {CheckboxYGroup} from '@sbbol/web-library/desktop/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {MobileOptionsWrapper} from '../common/MobileOptionsWrapper/MobileOptionsWrapper';

const [state, setState] = useState({
    disabled: false,
    loading: false,
});

const options = [
    {
        label: 'Disabled',
        checked: state.disabled,
        onChange: (e) => setState({...state, disabled: e.target.checked})
    }, {
        label: 'Loading',
        checked: state.loading,
        onChange: (e) => setState({...state, loading: e.target.checked})
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

    <ButtonGeneral disabled={state.disabled} isLoading={state.loading}>Button Name</ButtonGeneral>
</>
```