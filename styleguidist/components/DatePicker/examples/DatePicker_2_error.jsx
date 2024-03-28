import React from 'react';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
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
            <Label.Text id="date-picker-error-label">Дата</Label.Text>
        </Label>
    </Col>
    <Col size={10}>
        <DatePicker
            value={value}
            onChange={setValue}
            aria-label="Выберите дату"
            aria-labelledby="date-picker-error-label"
            aria-invalid={true}
            aria-errormessage="date-picker-error-message"
            nextButtonProps={{'aria-label': 'Следующий месяц'}}
            prevButtonProps={{'aria-label': 'Предыдущий месяц'}}
            error
        />
        <Gap size={8} />
        <AlertContext id="date-picker-error-message" type={EAlertType.ERROR}>
            Описание ошибки
        </AlertContext>
    </Col>
</Field>