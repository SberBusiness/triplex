import React from 'react';
import moment from 'moment';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';

const [pickedDate, setPickedDate] = React.useState(moment());

const limitRange = {dateFrom: moment().startOf('month'), dateTo: moment().endOf('month')};

<Calendar
    pickedDate={pickedDate}
    onChangeDate={setPickedDate}
    limitRange={limitRange}
    dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-day'}}
    monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-month'}}
    yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendar-year'}}
    prevButtonProps={{'data-action': 'click', 'data-label': 'calendar-prev-button'}}
    nextButtonProps={{'data-action': 'click', 'data-label': 'calendar-next-button'}}
    changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendar-change-view-link'}}
/>