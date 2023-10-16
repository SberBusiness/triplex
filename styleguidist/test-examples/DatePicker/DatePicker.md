```jsx
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import ComponentOptions from '../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../common/components/ComponentPreview/ComponentPreview';

const [value, setValue] = React.useState('');
const [focused, setFocused] = React.useState(false);
const [reversedPick, setReversedPick] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

React.useEffect(() => {
    if (focused) {
        document.querySelector('[data-id="date-picker"]').focus();
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'reversed',
        label: 'Reversed pick',
        checked: reversedPick,
        onChange: setReversedPick,
    },
    {
        id: 'focused',
        label: 'Focused',
        checked: focused,
        onChange: setFocused,
    },
    {
        id: 'error',
        label: 'Error',
        checked: error,
        onChange: setError,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        checked: disabled,
        onChange: setDisabled,
    },
];

const inputOptions = [
    {
        id: 'value',
        onChange: setValue,
        hidden: true,
        value,
    },
];

const markedDays = [
    moment(0).subtract(3, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(11, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(25, 'days').format(dateFormatYYYYMMDD),
];

const disabledDays = [
    moment(0).add(3, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(10, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(17, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(24, 'days').format(dateFormatYYYYMMDD),
    moment(0).add(31, 'days').format(dateFormatYYYYMMDD),
];

const style = {
    paddingBottom: focused ? '216px' : undefined,
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions}/>
    <ComponentPreview style={style}>
        <DatePicker
            value={value}
            onChange={setValue}
            markedDays={markedDays}
            disabledDays={disabledDays}
            reversedPick={reversedPick}
            error={error}
            disabled={disabled}
            data-id="date-picker"
        />
    </ComponentPreview>
</>
```
