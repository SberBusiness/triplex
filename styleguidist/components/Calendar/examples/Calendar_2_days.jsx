import React, {useState} from 'react';
import moment from 'moment';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [pickedDate, setPickedDate] = useState(moment());

const markedDays = [
    moment().subtract(10, 'days').format(dateFormatYYYYMMDD),
    moment().subtract(4, 'days').format(dateFormatYYYYMMDD),
    moment().subtract(1, 'days').format(dateFormatYYYYMMDD),
    moment().add(4, 'days').format(dateFormatYYYYMMDD),
    moment().add(5, 'days').format(dateFormatYYYYMMDD),
];

const disabledDays = [
    moment().add(6, 'days').format(dateFormatYYYYMMDD),
    moment().add(7, 'days').format(dateFormatYYYYMMDD),
];

<Calendar
    pickedDate={pickedDate}
    onDateChange={setPickedDate}
    markedDays={markedDays}
    disabledDays={disabledDays}
    dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-day'}}
    monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-month'}}
    yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-year'}}
    prevButtonProps={{'data-action': 'click', 'data-label': 'calendar-prev-button'}}
    nextButtonProps={{'data-action': 'click', 'data-label': 'calendar-next-button'}}
    viewButtonProps={{'data-action': 'click', 'data-label': 'calendar-view-button'}}
/>