import React, {useState} from 'react';
import {MonthYearPicker} from '@sberbusiness/triplex/components/MonthYearPicker/MonthYearPicker';
import {ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';
import {Field} from '@sberbusiness/triplex/components/Field/Field';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Label} from '@sberbusiness/triplex/components/Label/Label';

const [value, setValue] = useState('');

const viewModeToPeriodMap = {
    [ECalendarViewMode.DAYS]: 'месяц',
    [ECalendarViewMode.MONTHS]: 'год',
    [ECalendarViewMode.YEARS]: 'период',
};

const getPrevButtonProps = (viewMode) => ({'aria-label': `Предыдущий ${viewModeToPeriodMap[viewMode]}`});
const getNextButtonProps = (viewMode) => ({'aria-label': `Следующий ${viewModeToPeriodMap[viewMode]}`});

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
            aria-labelledby="month-year-picker-label"
            prevButtonProps={getPrevButtonProps}
            nextButtonProps={getNextButtonProps}
        />
    </Col>
</Field>