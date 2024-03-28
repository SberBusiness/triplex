```jsx
const [value, setValue] = React.useState();

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

<Select
    value={value}
    options={options}
    placeholder="Выберите значение"
    mobileTitle="Выберите значение"
    onChange={setValue}
/>
```

### Disabled state

```jsx
const [value, setValue] = React.useState();

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

<Select
    value={value}
    options={options}
    placeholder="Выберите значение"
    mobileTitle="Выберите значение"
    onChange={setValue}
    disabled
/>
```

### Error state

```jsx
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

const [value, setValue] = React.useState();

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
    <Select
        value={value}
        options={options}
        placeholder="Выберите значение"
        mobileTitle="Выберите значение"
        onChange={setValue}
        error
        targetProps={{
            'aria-invalid': true,
            'aria-errormessage': 'select-error-id',
        }}
    />
    <Gap size={8} />
    <AlertContext id="select-error-id" type={EAlertType.ERROR}>Описание ошибки</AlertContext>
</>
```

### Loading state

```jsx
const [value, setValue] = React.useState();

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

<Select
    value={value}
    options={options}
    placeholder="Выберите значение"
    mobileTitle="Выберите значение"
    onChange={setValue}
    loading
/>
```

### With label

```jsx
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Field} from '@sberbusiness/triplex/components/Field/Field';

const [value, setValue] = React.useState();

const options = [
    {value: 'i1', label: 'Яблоко'},
    {value: 'i2', label: 'Апельсин'},
    {value: 'i3', label: 'Лимон'},
    {value: 'i4', label: 'Груша'},
    {value: 'i5', label: 'Манго'},
    {value: 'i6', label: 'Авокадо'},
    {value: 'i7', label: 'Ананас'},
    {value: 'i8', label: 'Банан'},
    {value: 'i9', label: 'Гранат'},
    {value: 'i10', label: 'Киви'},
];

<Field alignLabel>
    <Col size={3}>
        <Label>
            <Label.Text id="select_id1">Любимый фрукт</Label.Text>
        </Label>
    </Col>
    <Col size={9}>
        <Select
            aria-labelledby="select_id1"
            value={value}
            options={options}
            placeholder="Выберите значение"
            mobileTitle="Выберите значение"
            onChange={setValue}
        />
    </Col>
</Field>
```
