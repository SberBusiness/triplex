import React, {useState} from 'react';
import moment from 'moment';
import {DatePicker} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [value, setValue] = useState('');

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

<DatePicker value={value} onChange={setValue} markedDays={markedDays} disabledDays={disabledDays} />