```jsx
const [value, setValue] = React.useState();

const options = [
    {value: 'i1', id: 'select-option-0-0', label: 'Первый'},
    {value: 'i2', id: 'select-option-0-1', label: 'Второй'},
    {value: 'i3', id: 'select-option-0-2', label: 'Третий'},
    {value: 'i4', id: 'select-option-0-3', label: 'Четвертый'},
    {value: 'i5', id: 'select-option-0-4', label: 'Пятый'},
    {value: 'i6', id: 'select-option-0-5', label: 'Шестой'},
    {value: 'i7', id: 'select-option-0-6', label: 'Седьмой'},
    {value: 'i8', id: 'select-option-0-7', label: 'Восьмой'},
    {value: 'i9', id: 'select-option-0-8', label: 'Девятый'},
    {value: 'i10', id: 'select-option-0-9', label: 'Десятый'},
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
    {value: 'i1', id: 'select-option-1-0', label: 'Первый'},
    {value: 'i2', id: 'select-option-1-1', label: 'Второй'},
    {value: 'i3', id: 'select-option-1-2', label: 'Третий'},
    {value: 'i4', id: 'select-option-1-3', label: 'Четвертый'},
    {value: 'i5', id: 'select-option-1-4', label: 'Пятый'},
    {value: 'i6', id: 'select-option-1-5', label: 'Шестой'},
    {value: 'i7', id: 'select-option-1-6', label: 'Седьмой'},
    {value: 'i8', id: 'select-option-1-7', label: 'Восьмой'},
    {value: 'i9', id: 'select-option-1-8', label: 'Девятый'},
    {value: 'i10', id: 'select-option-1-9', label: 'Десятый'},
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
    {value: 'i1', id: 'select-option-2-0', label: 'Первый'},
    {value: 'i2', id: 'select-option-2-1', label: 'Второй'},
    {value: 'i3', id: 'select-option-2-2', label: 'Третий'},
    {value: 'i4', id: 'select-option-2-3', label: 'Четвертый'},
    {value: 'i5', id: 'select-option-2-4', label: 'Пятый'},
    {value: 'i6', id: 'select-option-2-5', label: 'Шестой'},
    {value: 'i7', id: 'select-option-2-6', label: 'Седьмой'},
    {value: 'i8', id: 'select-option-2-7', label: 'Восьмой'},
    {value: 'i9', id: 'select-option-2-8', label: 'Девятый'},
    {value: 'i10', id: 'select-option-2-9', label: 'Десятый'},
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
    {value: 'i1', id: 'select-option-3-0', label: 'Первый'},
    {value: 'i2', id: 'select-option-3-1', label: 'Второй'},
    {value: 'i3', id: 'select-option-3-2', label: 'Третий'},
    {value: 'i4', id: 'select-option-3-3', label: 'Четвертый'},
    {value: 'i5', id: 'select-option-3-4', label: 'Пятый'},
    {value: 'i6', id: 'select-option-3-5', label: 'Шестой'},
    {value: 'i7', id: 'select-option-3-6', label: 'Седьмой'},
    {value: 'i8', id: 'select-option-3-7', label: 'Восьмой'},
    {value: 'i9', id: 'select-option-3-8', label: 'Девятый'},
    {value: 'i10', id: 'select-option-3-9', label: 'Десятый'},
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
    {value: 'i1', id: 'select-option-4-0', label: 'Яблоко'},
    {value: 'i2', id: 'select-option-4-1', label: 'Апельсин'},
    {value: 'i3', id: 'select-option-4-2', label: 'Лимон'},
    {value: 'i4', id: 'select-option-4-3', label: 'Груша'},
    {value: 'i5', id: 'select-option-4-4', label: 'Манго'},
    {value: 'i6', id: 'select-option-4-5', label: 'Авокадо'},
    {value: 'i7', id: 'select-option-4-6', label: 'Ананас'},
    {value: 'i8', id: 'select-option-4-7', label: 'Банан'},
    {value: 'i9', id: 'select-option-4-8', label: 'Гранат'},
    {value: 'i10', id: 'select-option-4-9', label: 'Киви'},
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
