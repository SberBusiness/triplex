import React, {useState} from 'react';
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import {ECalendarDateMarkType} from '@sberbusiness/triplex/components/Calendar/enums';

const [value, setValue] = useState('');

const markedDays = {
    [moment().subtract(1, 'days').format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.BASIC,
    [moment().subtract(2, 'days').format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.STANDARD,
    [moment().add(1, 'days').format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.ATTENTION,
    [moment().add(2, 'days').format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.CRITICAL,
};

const disabledDays = [
    moment().subtract(3, 'days').format(dateFormatYYYYMMDD),
    moment().subtract(4, 'days').format(dateFormatYYYYMMDD),
    moment().add(3, 'days').format(dateFormatYYYYMMDD),
    moment().add(4, 'days').format(dateFormatYYYYMMDD),
];

<DatePicker
    value={value}
    onChange={setValue}
    invalidDateHint="Указана недоступная для выбора дата."
    markedDays={markedDays}
    disabledDays={disabledDays}
/>