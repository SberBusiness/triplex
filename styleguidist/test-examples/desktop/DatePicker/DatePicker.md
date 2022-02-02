```jsx
import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import {DatePicker, EDatePickerOrientation} from '@sbbol/web-library/desktop/components/DatePicker/DatePicker';
import {dateFormatYYYYMMDD} from '@sbbol/web-library/desktop/common/consts/DateConst';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [value, setValue] = useState('');
const [focused, setFocused] = useState(false);
const [orientation, setOrientation] = useState(EDatePickerOrientation.BOTTOM);
const [reversedPick, setReversedPick] = useState(false);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);

useEffect(() => {
    if (focused) {
        document.querySelector('[data-id="date-picker"]').focus();
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'dropup',
        label: 'Dropup',
        checked: orientation,
        onChange: (checked) => setOrientation(checked ? EDatePickerOrientation.TOP : EDatePickerOrientation.BOTTOM),
    },
    {
        id: 'reversed',
        label: 'Reversed pick',
        checked: orientation,
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
    paddingBottom: focused && orientation == EDatePickerOrientation.BOTTOM ? '238px' : undefined,
    paddingTop: focused && orientation == EDatePickerOrientation.TOP ? '238px' : undefined,
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={style}>
        <DatePicker
            value={value}
            onChange={setValue}
            markedDays={markedDays}
            disabledDays={disabledDays}
            orientation={orientation}
            reversedPick={reversedPick}
            error={error}
            disabled={disabled}
            data-id="date-picker"
        />
    </ComponentPreview>
</>
```
