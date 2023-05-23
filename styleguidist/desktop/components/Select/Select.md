```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Select"
    isMobileComponent={false}
/>
```

```jsx 
import {Select} from '@sberbusiness/triplex/desktop/components/Select/Select';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';

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
        <input type="checkbox" checked={loading} onChange={(event) => setLoading(event.target.checked)} data-label="Loading" />
        <input type="checkbox" checked={error} onChange={(event) => setError(event.target.checked)} data-label="Error" />
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} data-label="Disabled" />
    </ExampleControlPanel>
);

<>
    {renderControlPanel()}
    <Select
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
