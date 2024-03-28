import React from 'react';
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [value, setValue] = React.useState('');

const markedDays = [
    moment().subtract(1, 'days').format(dateFormatYYYYMMDD),
    moment().subtract(2, 'days').format(dateFormatYYYYMMDD),
    moment().add(1, 'days').format(dateFormatYYYYMMDD),
    moment().add(2, 'days').format(dateFormatYYYYMMDD),
];

const disabledDays = [
    moment().subtract(1, 'weeks').format(dateFormatYYYYMMDD),
    moment().subtract(2, 'weeks').format(dateFormatYYYYMMDD),
    moment().add(1, 'weeks').format(dateFormatYYYYMMDD),
    moment().add(2, 'weeks').format(dateFormatYYYYMMDD),
];

<Field alignLabel>
    <Col size={2}>
        <Label>
            <Label.Text id="date-picker-days-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <DatePicker
            value={value}
            onChange={setValue}
            markedDays={markedDays}
            disabledDays={disabledDays}
            aria-label="Выберите дату"
            aria-labelledby="date-picker-days-label"
            nextButtonProps={{'aria-label': 'Следующий месяц'}}
            prevButtonProps={{'aria-label': 'Предыдущий месяц'}}
        />
    </Col>
</Field>