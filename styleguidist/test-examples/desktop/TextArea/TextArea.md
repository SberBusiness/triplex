```jsx noeditor
import React, {useState} from 'react';
import {TextArea} from '@sberbusiness/triplex/desktop/components/TextArea/TextArea';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [state, setState] = useState({
    disabled: false,
    error: false,
    value: '',
    cols: undefined,
});

const checkboxOptions = [
    {
        id: 'error',
        label: 'Error',
        checked: state.error,
        onChange: (checked) => setState((prevState) => ({...prevState, error: checked})),
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: state.disabled,
        onChange: (checked) => setState((prevState) => ({...prevState, disabled: checked})),
    },
    {
        id: 'cols',
        label: 'Длина указана в символах',
        checked: state.cols,
        onChange: (checked) => setState((prevState) => ({...prevState, cols: checked ? 50 : undefined})),
    },
];

const inputOptions = [
    {
        id: 'value',
        hidden: true,
        onChange: (newValue) => {
            setState({value: newValue});
        },
        value: state.value,
    },
];

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />

    <ComponentPreview>
        <TextArea
            disabled={state.disabled}
            error={state.error}
            value={state.value}
            cols={state.cols}
            rows={5}
            onChange={(e) => setState({...state, value: e.target.value})}
            placeholder="Введите текст"
        />
    </ComponentPreview>
</>;
```
