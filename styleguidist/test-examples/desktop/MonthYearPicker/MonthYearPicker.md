```jsx
import {MonthYearPicker} from '@sberbusiness/triplex/desktop/components/MonthYearPicker/MonthYearPicker';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [value, setValue] = React.useState('');
const [reversedPick, setReversedPick] = React.useState(false);
const [focused, setFocused] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

React.useEffect(() => {
    if (focused) {
        document.querySelector('[data-id="month-year-picker"]').focus();
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
        hidden: true,
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
        hidden: true,
        onChange: setValue,
        value,
    },
];

const style = {
    paddingBottom: focused ? '216px' : undefined,
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={style}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            reversedPick={reversedPick}
            error={error}
            disabled={disabled}
            data-id="month-year-picker"
        />
    </ComponentPreview>
</>
```
