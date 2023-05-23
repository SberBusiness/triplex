```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="DatePicker"
    isMobileComponent={false}
/>
```

```jsx
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/desktop/components/DatePicker/DatePicker';
import {EDropdownAlignment} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
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
        <input type="checkbox" checked={limit} onChange={(event) => setLimit(event.target.checked)} data-label="Current month only" />
        <input type="checkbox" checked={reversedPick} onChange={(event) => setReversedPick(event.target.checked)} data-label="Reversed pick" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

const markedDays = [
    moment().subtract(2, 'weeks').format(dateFormatYYYYMMDD),
    moment().subtract(4, 'weeks').format(dateFormatYYYYMMDD),
    moment().add(2, 'weeks').format(dateFormatYYYYMMDD),
    moment().add(4, 'weeks').format(dateFormatYYYYMMDD),
];

const disabledDays = [
    moment().subtract(2, 'days').format(dateFormatYYYYMMDD),
    moment().subtract(4, 'days').format(dateFormatYYYYMMDD),
    moment().add(2, 'days').format(dateFormatYYYYMMDD),
    moment().add(4, 'days').format(dateFormatYYYYMMDD),
];

<>
    {renderControlPanel()}
    <DatePicker
        value={value}
        onChange={setValue}
        alignment={alignment}
        limitRange={limit ? {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')} : undefined}
        markedDays={markedDays}
        disabledDays={disabledDays}
        reversedPick={reversedPick}
        error={error}
        disabled={disabled}
        data-id="date-picker"
    />
</>
```
