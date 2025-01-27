import React, {useState} from 'react';
import moment from 'moment';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [pickedRange, setPickedRange] = useState([
    moment(),
    moment().add(1, 'month'),
]);

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

<Calendar.Range pickedRange={pickedRange} onRangeChange={setPickedRange}>
    {(props) => (
        <Calendar
            {...props}
            markedDays={markedDays}
            disabledDays={disabledDays}
            dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-day'}}
            monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-month'}}
            yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-year'}}
            prevButtonProps={{'data-action': 'click', 'data-label': 'calendar-prev-button'}}
            nextButtonProps={{'data-action': 'click', 'data-label': 'calendar-next-button'}}
            viewButtonProps={{'data-action': 'click', 'data-label': 'calendar-view-button'}}
        />
    )}
    {(props) => (
        <Calendar
            {...props}
            markedDays={markedDays}
            disabledDays={disabledDays}
            dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-day'}}
            monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-month'}}
            yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-year'}}
            prevButtonProps={{'data-action': 'click', 'data-label': 'calendar-prev-button'}}
            nextButtonProps={{'data-action': 'click', 'data-label': 'calendar-next-button'}}
            viewButtonProps={{'data-action': 'click', 'data-label': 'calendar-view-button'}}
        />
    )}
</Calendar.Range>