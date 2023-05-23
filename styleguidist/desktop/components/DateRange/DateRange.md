### With DatePicker usage

```jsx
import {DateRange} from '@sberbusiness/triplex/desktop/components/DateRange/DateRange';
import {EDateRangeShiftUnit} from '@sberbusiness/triplex/desktop/components/DateRange/enums';
import {DatePicker} from '@sberbusiness/triplex/desktop/components/DatePicker/DatePicker';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = React.useState(['', '']);
const [shiftAmount, setShiftAmount] = React.useState(1);
const [shiftUnit, setShiftUnit] = React.useState(EDateRangeShiftUnit.MONTH);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="number" value={shiftAmount} onChange={(event) => setShiftAmount(event.target.value)} min="1" max="99" data-label="Shift amount" />
        <select value={shiftUnit} onChange={(event) => setShiftUnit(event.target.value)} data-label="Shift unit">
            {Object.values(EDateRangeShiftUnit).map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
    </ExampleControlPanel>
);

const renderPicker = (props) => <DatePicker {...props} />;
const renderButton = (props) => <ButtonIcon {...props} />;

<>
    {renderControlPanel()}
    <DateRange
        value={value}
        onChange={setValue}
        shiftAmount={shiftAmount}
        shiftUnit={shiftUnit}
        renderPickerFrom={renderPicker}
        renderPickerTo={renderPicker}
        renderButtonBack={renderButton}
        renderButtonForward={renderButton}
    />
</>
```

### With MonthYearPicker usage

```jsx
import {DateRange} from '@sberbusiness/triplex/desktop/components/DateRange/DateRange';
import {EDateRangeShiftUnit} from '@sberbusiness/triplex/desktop/components/DateRange/enums';
import {MonthYearPicker} from '@sberbusiness/triplex/desktop/components/MonthYearPicker/MonthYearPicker';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

const [value, setValue] = React.useState(['', '']);
const [shiftAmount, setShiftAmount] = React.useState(1);
const [shiftUnit, setShiftUnit] = React.useState(EDateRangeShiftUnit.MONTH);

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="number" value={shiftAmount} onChange={(event) => setShiftAmount(event.target.value)} min="1" max="99" data-label="Shift amount" />
        <select value={shiftUnit} onChange={(event) => setShiftUnit(event.target.value)} data-label="Shift unit">
            {Object.values(EDateRangeShiftUnit).map((value, index) => (
                <option key={index} disabled={index < 2}>{value}</option>
            ))}
        </select>
    </ExampleControlPanel>
);

const renderPicker = (props) => <MonthYearPicker {...props} />;
const renderButton = (props) => <ButtonIcon {...props} />;

<>
    {renderControlPanel()}
    <DateRange
        value={value}
        onChange={setValue}
        shiftAmount={shiftAmount}
        shiftUnit={shiftUnit}
        renderPickerFrom={renderPicker}
        renderPickerTo={renderPicker}
        renderButtonBack={renderButton}
        renderButtonForward={renderButton}
    />
</>
```

### With custom period change

```jsx
import moment from 'moment';
import {DateRange} from '@sberbusiness/triplex/desktop/components/DateRange/DateRange';
import {EDateRangeShiftUnit} from '@sberbusiness/triplex/desktop/components/DateRange/enums';
import {DatePicker} from '@sberbusiness/triplex/desktop/components/DatePicker/DatePicker';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/desktop/common/consts/DateConst';

const [value, setValue] = React.useState(['', '']);

const handleClickBack = () => {
    const [start, end] = value;
    const momentStart = moment(start, dateFormatYYYYMMDD);
    const momentEnd = moment(end, dateFormatYYYYMMDD);
    const amount = momentEnd.diff(momentStart, 'day') || 1;

    setValue([
        momentStart.subtract(amount, 'day').format(dateFormatYYYYMMDD),
        momentEnd.subtract(amount, 'day').format(dateFormatYYYYMMDD),
    ]);
};

const handleClickForward = () => {
    const [start, end] = value;
    const momentStart = moment(start, dateFormatYYYYMMDD);
    const momentEnd = moment(end, dateFormatYYYYMMDD);
    const amount = momentEnd.diff(momentStart, 'day') || 1;

    setValue([
        momentStart.add(amount, 'day').format(dateFormatYYYYMMDD),
        momentEnd.add(amount, 'day').format(dateFormatYYYYMMDD),
    ]);
};

const renderPicker = (props) => <DatePicker {...props} />;
const renderButtonBack = (props) => <ButtonIcon {...props} onClick={handleClickBack} />;
const renderButtonForward = (props) => <ButtonIcon {...props} onClick={handleClickForward} />;

<DateRange
    value={value}
    onChange={setValue}
    renderPickerFrom={renderPicker}
    renderPickerTo={renderPicker}
    renderButtonBack={renderButtonBack}
    renderButtonForward={renderButtonForward}
/>
```