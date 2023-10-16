```jsx
import moment from 'moment';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [currentDate, setCurrentDate] = React.useState(moment());
const [currentRange, setCurrentRange] = React.useState([moment(), moment().add(1, 'month')]);
const [markedDays, setMarkedDays] = React.useState(getMarkedDays());
const [disabledDays, setDisabledDays] = React.useState(getDisabledDays());

function getMarkedDays() {
    return [
        moment().subtract(7, 'days').format(dateFormatYYYYMMDD),
        moment().subtract(1, 'days').format(dateFormatYYYYMMDD),
        moment().add(1, 'days').format(dateFormatYYYYMMDD),
        moment().add(7, 'days').format(dateFormatYYYYMMDD),
    ];
}

function getDisabledDays() {
    return [
        moment().subtract(8, 'days').format(dateFormatYYYYMMDD),
        moment().subtract(6, 'days').format(dateFormatYYYYMMDD),
        moment().add(6, 'days').format(dateFormatYYYYMMDD),
        moment().add(8, 'days').format(dateFormatYYYYMMDD),
    ];
}

const onChangePage = (currentDate, tab, direction) => {
    setMarkedDays(getMarkedDays(currentDate));
    setDisabledDays(getDisabledDays(currentDate));
};

<Calendar
    pickedDate={currentDate}
    markedDays={markedDays}
    disabledDays={disabledDays}
    onChangeDate={setCurrentDate}
    onChangePage={onChangePage}
    dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
    monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
    yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
    prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
    nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
    changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
/>
```

### Range mode

```jsx
import moment from 'moment';
import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';

const [currentDate, setCurrentDate] = React.useState(moment());
const [currentRange, setCurrentRange] = React.useState([moment(), moment().add(1, 'month')]);
const [markedDays, setMarkedDays] = React.useState(getMarkedDays());
const [disabledDays, setDisabledDays] = React.useState(getDisabledDays());

function getMarkedDays() {
    return [
        moment().subtract(7, 'days').format(dateFormatYYYYMMDD),
        moment().subtract(1, 'days').format(dateFormatYYYYMMDD),
        moment().add(1, 'days').format(dateFormatYYYYMMDD),
        moment().add(7, 'days').format(dateFormatYYYYMMDD),
    ];
}

function getDisabledDays() {
    return [
        moment().subtract(8, 'days').format(dateFormatYYYYMMDD),
        moment().subtract(6, 'days').format(dateFormatYYYYMMDD),
        moment().add(6, 'days').format(dateFormatYYYYMMDD),
        moment().add(8, 'days').format(dateFormatYYYYMMDD),
    ];
}

const onChangePage = (currentDate, tab, direction) => {
    setMarkedDays(getMarkedDays(currentDate));
    setDisabledDays(getDisabledDays(currentDate));
};

<Calendar.Range onChangeRange={setCurrentRange} pickedRange={currentRange}>
    {(props) => (
        <Calendar
            {...props}
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
            dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
            monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
            yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
            prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
            nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
            changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
        />
    )}
</Calendar.Range>
```
