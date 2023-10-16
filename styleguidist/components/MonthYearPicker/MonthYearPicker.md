```jsx
import moment from 'moment';
import {EDropdownAlignment} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [value, setValue] = React.useState('');
const [alignment, setAlignment] = React.useState(EDropdownAlignment.LEFT);
const [limit, setLimit] = React.useState(false);
const [reversedPick, setReversedPick] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={alignment}
            setValue={setAlignment}
            options={Object.values(EDropdownAlignment)}
        >
            Alignment
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Checkbox checked={limit} setChecked={setLimit}>
            Current year only
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={reversedPick} setChecked={setReversedPick}>
            ReversedPick
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={error} setChecked={setError}>
            Error
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={disabled} setChecked={setDisabled}>
            Disabled
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

const limitRange = {dateFrom: moment().startOf('year'), dateTo: moment().endOf('year')};

<>
    {renderControlPanel()}
    <MonthYearPicker
        value={value}
        onChange={setValue}
        alignment={alignment}
        limitRange={limit ? limitRange : undefined}
        reversedPick={reversedPick}
        error={error}
        disabled={disabled}
        data-id="month-year-picker"
    />
</>
```
