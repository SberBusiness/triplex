```jsx
import {ITextFieldProps, TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [type, setType] = React.useState('text');
const [value, setValue] = React.useState('');
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);
const [success, setSuccess] = React.useState(false);
const [clearIcon, setClearIcon] = React.useState(true);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={error} setChecked={setError}>
            Error
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={success} setChecked={setSuccess}>
            Success icon
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={clearIcon} setChecked={setClearIcon}>
            Clear button
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Select
            value={type}
            setValue={setType}
            options={['text', 'password']}
        >
            Input type
        </ComponentControlPanel.Select>
    </ComponentControlPanel>
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

