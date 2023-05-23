```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency componentTitle="TextArea" isMobileComponent={false} />;
```

```jsx
import React, {useState} from 'react';
import {TextArea} from '@sberbusiness/triplex/desktop/components/TextArea/TextArea';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';

const [state, setState] = useState({
    disabled: false,
    error: false,
    value: '',
    cols: 50,
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

<>
    <ComponentOptions checkboxOptions={checkboxOptions} />

    <TextArea
        disabled={state.disabled}
        error={state.error}
        value={state.value}
        cols={state.cols}
        rows={5}
        onChange={(e) => setState({...state, value: e.target.value})}
        placeholder="Введите текст"
    />
</>;
```
