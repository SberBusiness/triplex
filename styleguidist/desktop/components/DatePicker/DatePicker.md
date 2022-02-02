```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="DatePicker"
    isMobileComponent={false} 
/>
```

```jsx
import React, {useState} from 'react';
import moment from 'moment';
import {DatePicker, EDatePickerOrientation} from '@sbbol/web-library/desktop/components/DatePicker/DatePicker';
import {dateFormatYYYYMMDD} from '@sbbol/web-library/desktop/common/consts/DateConst';

const [value, setValue] = useState('');
const [limit, setLimit] = useState(false);
const [reversedPick, setReversedPick] = useState(false);
const [orientation, setOrientation] = useState(EDatePickerOrientation.BOTTOM);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);

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

const setDropup = (checked) => setOrientation(checked ? EDatePickerOrientation.TOP : EDatePickerOrientation.BOTTOM);

const renderCheckbox = (label, checked, handler) => (
    <label style={{display: 'inline-flex'}}>
        <input type="checkbox" checked={checked} onChange={(event) => handler(event.target.checked)} style={{margin: 'auto 4px auto 0'}} />
        {label}
    </label>
);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        {renderCheckbox('Current month only', limit, setLimit)}
        {renderCheckbox('Dropup menu', orientation, setDropup)}
        {renderCheckbox('Reversed pick', reversedPick, setReversedPick)}
        {renderCheckbox('Error', error, setError)}
        {renderCheckbox('Disabled', disabled, setDisabled)}
    </div>
);

<>
    {renderControls()}
    <DatePicker
        value={value}
        onChange={setValue}
        limitRange={limit ? {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')} : undefined}
        markedDays={markedDays}
        disabledDays={disabledDays}
        orientation={orientation}
        reversedPick={reversedPick}
        error={error}
        disabled={disabled}
    />
</>
```
