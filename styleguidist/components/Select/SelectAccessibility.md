```jsx 
import {Select} from '@sberbusiness/triplex/components/Select/Select';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Field} from '@sberbusiness/triplex/components/Field/Field';

const [value, setValue] = React.useState(undefined);

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
    <Col size={8}>
        <Select
            aria-labelledby="select_id1"
            id="Default select"
            placeholder="Выберите значение"
            value={value}
            options={options}
            onChange={(opt) => setValue(options.filter(option => option.value === opt.value)[0])}
        />
    </Col>
</Field>
````
