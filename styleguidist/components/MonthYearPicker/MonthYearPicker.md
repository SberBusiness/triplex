```jsx
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="month-year-picker-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="month-year-picker-label"
        />
    </Col>
</Field>
```

### Disabled state

```jsx
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="month-year-picker-disabled-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="month-year-picker-disabled-label"
            disabled
        />
    </Col>
</Field>
```

### Error state

```jsx
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {AlertContext} from '@sberbusiness/triplex/components/Alert/AlertContext/AlertContext';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

const [value, setValue] = React.useState('');

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="month-year-picker-error-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="month-year-picker-error-label"
            aria-invalid={true}
            aria-errormessage="month-year-picker-error-message"
            error
        />
        <Gap size={8} />
        <AlertContext id="month-year-picker-error-message" type={EAlertType.ERROR}>
            Описание ошибки
        </AlertContext>
    </Col>
</Field>
```

### Reversed pick

```jsx
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="month-year-picker-reversed-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="month-year-picker-reversed-label"
            reversedPick
        />
    </Col>
</Field>
```

### With limit range (current year only)

```jsx
import moment from 'moment';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

const limitRange = {dateFrom: moment().startOf('year'), dateTo: moment().endOf('year')};

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="month-year-picker-limit-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <MonthYearPicker
            value={value}
            onChange={setValue}
            limitRange={limitRange}
            aria-label="Выберите дату"
            aria-labelledby="month-year-picker-limit-label"
        />
    </Col>
</Field>
```
