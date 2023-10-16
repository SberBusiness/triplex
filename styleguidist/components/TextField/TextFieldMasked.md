```jsx
import {ITextFieldProps, TextField} from '@sberbusiness/triplex/components/TextField/TextField';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

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
