```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="MonthYearPicker"
    isMobileComponent={false}
/>
```

```jsx
import moment from 'moment';
import {MonthYearPicker} from '@sberbusiness/triplex/desktop/components/MonthYearPicker/MonthYearPicker';
import {EDropdownAlignment} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = React.useState('');
const [alignment, setAlignment] = React.useState(EDropdownAlignment.LEFT);
const [limit, setLimit] = React.useState(false);
const [reversedPick, setReversedPick] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <select value={alignment} onChange={(event) => setAlignment(event.target.value)} data-label="Alignment">
            {Object.values(EDropdownAlignment).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <input type="checkbox" checked={limit} onChange={(event) => setLimit(event.target.checked)} data-label="Current year only" />
        <input type="checkbox" checked={reversedPick} onChange={(event) => setReversedPick(event.target.checked)} data-label="Reversed pick" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <MonthYearPicker
        value={value}
        onChange={setValue}
        alignment={alignment}
        limitRange={limit ? {dateFrom: moment().startOf('year'), dateTo: moment().endOf('year')} : undefined}
        reversedPick={reversedPick}
        error={error}
        disabled={disabled}
        data-id="month-year-picker"
    />
</>
```
