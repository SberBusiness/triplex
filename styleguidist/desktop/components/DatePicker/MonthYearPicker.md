```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="MonthYearPicker"
    isMobileComponent={false} 
/>
```

```jsx
import React, {useState} from 'react';
import {MonthYearPicker} from '@sbbol/web-library/desktop/components/MonthYearPicker/MonthYearPicker';
import moment from 'moment';

const [value, setValue] = useState('');
const [limit, setLimit] = useState(false);
const [reversedPick, setReversedPick] = useState(false);
const [error, setError] = useState(false);
const [disabled, setDisabled] = useState(false);

const renderCheckbox = (label, checked, handler) => (
    <label style={{display: 'inline-flex'}}>
        <input type="checkbox" checked={checked} onChange={(event) => handler(event.target.checked)} style={{margin: 'auto 4px auto 0'}} />
        {label}
    </label>
);

const renderControls = () => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '16px'}}>
        {renderCheckbox('Current year only', limit, setLimit)}
        {renderCheckbox('Reversed pick', reversedPick, setReversedPick)}
        {renderCheckbox('Error', error, setError)}
        {renderCheckbox('Disabled', disabled, setDisabled)}
    </div>
);

<>
    {renderControls()}
    <MonthYearPicker 
        data-id="month-year-picker"
        value={value} 
        onChange={setValue}
        limitRange={limit ? {dateFrom: moment().startOf('year'), dateTo: moment().endOf('year')} : undefined}
        reversedPick={reversedPick}
        error={error}
        disabled={disabled}
    />
</>
```
