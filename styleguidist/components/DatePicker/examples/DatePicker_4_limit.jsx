import React from 'react';
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = React.useState('');

const limitRange = {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')};

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="date-picker-limit-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <DatePicker
            value={value}
            onChange={setValue}
            limitRange={limitRange}
            aria-label="Выберите дату"
            aria-labelledby="date-picker-limit-label"
            nextButtonProps={{'aria-label': 'Следующий месяц'}}
            prevButtonProps={{'aria-label': 'Предыдущий месяц'}}
        />
    </Col>
</Field>