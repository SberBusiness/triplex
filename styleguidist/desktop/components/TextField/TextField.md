```jsx
import React, {useState} from 'react';
import {ITextFieldProps, TextField} from '@sberbusiness/triplex/desktop/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [type, setType] = useState('text');
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
            data-label="SuccessIcon"
        />
        <input
            type="checkbox"
            checked={clearIcon}
            onChange={(event) => setClearIcon(event.target.checked)}
            data-label="Clear button"
        />
        <select value={type} onChange={(event) => setType(event.target.value)} data-label="Input type">
            <option value="text">text</option>
            <option value="password">password</option>
        </select>
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
            type,
            value,
            onChange: (event) => setValue(event.target.value),
            placeholder: 'Введите значение',
            disabled,
            error,
        }}
        label={<span data-test-id="text-field-label">Label</span>}
        success={success}
    />
</>
```

