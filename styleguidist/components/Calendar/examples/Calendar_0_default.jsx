import React, {useState} from 'react';
import moment from 'moment';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';

const [pickedDate, setPickedDate] = useState(moment());

<Calendar
    pickedDate={pickedDate}
    onDateChange={setPickedDate}
    dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-day'}}
    monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-month'}}
    yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-year'}}
    prevButtonProps={{'data-action': 'click', 'data-label': 'calendar-prev-button'}}
    nextButtonProps={{'data-action': 'click', 'data-label': 'calendar-next-button'}}
    viewButtonProps={{'data-action': 'click', 'data-label': 'calendar-view-button'}}
/>