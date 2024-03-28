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

<Calendar.Range pickedRange={pickedRange} onChangeRange={setPickedRange}>
    {(props) => (
        <Calendar
            {...props}
            markedDays={markedDays}
            disabledDays={disabledDays}
            dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
            monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
            yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
            prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
            nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
            changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
        />
    )}
    {(props) => (
        <Calendar
            {...props}
            markedDays={markedDays}
            disabledDays={disabledDays}
            dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
            monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
            yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
            prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
            nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
            changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
        />
    )}
</Calendar.Range>