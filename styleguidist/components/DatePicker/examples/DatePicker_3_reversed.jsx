import React from 'react';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="date-picker-reversed-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <DatePicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="date-picker-reversed-label"
            nextButtonProps={{'aria-label': 'Следующий месяц'}}
            prevButtonProps={{'aria-label': 'Предыдущий месяц'}}
            reversedPick
        />
    </Col>
</Field>