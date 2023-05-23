### Textarea

```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {FormGroupTextArea} from "./FormGroupTextArea";


const [state, setState] = React.useState({
    disabled: false,
    error: false,
    value: '',
});

const checkboxOptions = [
    {
        id: 'error',
        label: 'Error',
        checked: state.error,
        onChange: (checked) => setState(prevState => ({...prevState, error: checked}))
    }, {
        id: 'disabled',
        label: 'Disabled',
        checked: state.disabled,
        onChange: (checked) => setState(prevState => ({...prevState, disabled: checked}))
    }
];

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={state.error}
               onChange={(event) => setState(prevState => ({...prevState, error: event.target.checked}))}
               data-label="Error"/>
        <input type="checkbox" checked={state.disabled}
               onChange={(event) => setState(prevState => ({...prevState, disabled: event.target.checked}))}
               data-label="Disabled"/>
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}

    <FormGroupTextArea
        disabled={state.disabled}
        error={state.error}
        value={state.value}
        onChange={(v) => setState({...state, value: v})}
    />
</>
```

### Select

```jsx
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {FormGroupSelectExample} from "./FormGroupSelectExample";

const [value, setValue] = React.useState();
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);

const options = [
    {value: 'i1', label: 'Первый'},
    {value: 'i2', label: 'Второй'},
    {value: 'i3', label: 'Третий'},
    {value: 'i4', label: 'Четвертый'},
    {value: 'i5', label: 'Пятый'},
    {value: 'i6', label: 'Шестой'},
    {value: 'i7', label: 'Седьмой'},
    {value: 'i8', label: 'Восьмой'},
    {value: 'i9', label: 'Девятый'},
    {value: 'i10', label: 'Десятый'},
];

const placeholder = 'Выберите значение';

const renderControlPanel = () => (
    <ExampleControlPanel>
        <input type="checkbox" checked={loading} onChange={(event) => setLoading(event.target.checked)}
               data-label="Loading"/>
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error"/>
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)}
               data-label="Disabled"/>
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}

    <FormGroupSelectExample
        value={value}
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        loading={loading}
        error={error}
        disabled={disabled}
    />
</>
```
