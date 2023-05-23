```jsx
import React, {useState} from 'react';
import {ITextFieldProps, TextField} from '@sberbusiness/triplex/desktop/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {MaskedInput} from '@sberbusiness/triplex/desktop/components/MaskedInput/MaskedInput';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = useState('');
const [disabled, setDisabled] = useState(false);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);
const [clearIcon, setClearIcon] = useState(true);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
            data-label="Disabled"
        />
        <input
            type="checkbox"
            checked={error}
            onChange={(event) => setError(event.target.checked)}
            data-label="Error"
        />
        <input
            type="checkbox"
            checked={success}
            onChange={(event) => setSuccess(event.target.checked)}
            data-label="Success icon"
        />
        <input
            type="checkbox"
            checked={clearIcon}
            onChange={(event) => setClearIcon(event.target.checked)}
            data-label="Clear button"
        />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <TextField
        clearButtonProps={clearIcon ? {onClick: () => setValue('')} : undefined}
        description="Description может быть длинным."
        helpBoxProps={{
            children: 'Текст подсказки',
            tooltipSize: ETooltipSize.SM,
        }}
        inputProps={{
            disabled,
            error,
            onChange: (event) => setValue(event.target.value),
            value,
            render: (props, ref) => (
                <MaskedInput {...props} mask={MaskedInput.presets.masks.phone}/>
            ),
        }}
        label="Phone"
        success={success}
    />
</>
```