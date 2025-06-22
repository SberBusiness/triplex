import React, {useState} from 'react';
import moment from 'moment';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import {ECalendarDateMarkType} from '@sberbusiness/triplex/components/Calendar/enums';

const [pickedDate, setPickedDate] = useState(moment());

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