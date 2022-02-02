```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Select"
    isMobileComponent={false}
/>
```

```jsx 
import {Select, ESelectOrientation} from '@sbbol/web-library/desktop/components/Select/Select';

const [topOrientation, setTopOrientation] = React.useState(false);
const [disabled, setDisabled] = React.useState(false);
const [error, setError] = React.useState(false);
const [loading, setLoading] = React.useState(false);
const [value, setValue] = React.useState(undefined);

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

<>
    <div>
        <label><input type="checkbox" checked={topOrientation} onChange={(e) => setTopOrientation(e.target.checked)} /> Dropdown to top</label><br />
        <label><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><br />
        <label><input type="checkbox" checked={error} onChange={(e) => setError(e.target.checked)} /> Error</label><br />
        <label><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label><br /><br />
    </div>
    
    <Select
        id="Default select"
        error={error}
        disabled={disabled}
        loading={loading}
        placeholder="Выберите значение"
        value={value}
        options={options}
        onChange={(opt) => setValue(options.filter(option => option.value === opt.value)[0])}
        orientation={topOrientation ? ESelectOrientation.TOP : ESelectOrientation.BOTTOM}
    />
</>
````