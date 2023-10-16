```jsx
import moment from 'moment';
import {EDropdownAlignment} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Field} from '@sberbusiness/triplex/components/Field/Field';

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
            Current month only
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

const limitRange = {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')};

<>
    {renderControlPanel()}

    <Field alignLabel>
        <Col size={2}>
            <Label>
                <Label.Text id="DatePicker-id-for-accessibility">Дата</Label.Text>
            </Label>
        </Col>
        <Col size={10}>
            <DatePicker
                aria-describedby="DatePicker-id-for-accessibility"
                aria-label={`Выберите дату, ${value ? moment(value).format("MMMM Do YYYY") : ''}`}
                value={value}
                onChange={setValue}
                alignment={alignment}
                limitRange={limit ? limitRange : undefined}
                markedDays={markedDays}
                disabledDays={disabledDays}
                reversedPick={reversedPick}
                error={error}
                disabled={disabled}
                data-id="date-picker"
                nextButtonProps={{
                    'aria-label': 'Следующий месяц'
                }}
                prevButtonProps={{
                    'aria-label': 'Предыдущий месяц'
                }}
            />
        </Col>
    </Field>
</>
```
