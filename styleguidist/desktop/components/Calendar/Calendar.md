```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency
    componentTitle="Calendar"
/>
```

```jsx
import {dateFormatYYYYMMDD} from '@sbbol/web-library/desktop/common/consts/DateConst';
import {Calendar} from '@sbbol/web-library/desktop/components/Calendar/Calendar';
import moment from 'moment';
import React, {useState} from 'react';

const [currentDate, setCurrentDate] = useState(moment());
const [currentRange, setCurrentRange] = useState([moment(), moment().add(1, 'month')]);
const [markedDays, setMarkedDays] = useState(getMarkedDays());
const [selectRange, setSelectRange] = useState(false);
const [disabledDays, setDisabledDays] = useState(getDisabledDays());

function getDisabledDays (from = moment()) {
    return [
        from.subtract(6, 'days').format(dateFormatYYYYMMDD),
        from.subtract(2, 'days').format(dateFormatYYYYMMDD),
        from.add(2, 'days').format(dateFormatYYYYMMDD),
        from.add(6, 'days').format(dateFormatYYYYMMDD),
    ];
}

function getMarkedDays (from = moment()) {
    return [
        from.subtract(14, 'days').format(dateFormatYYYYMMDD),
        from.subtract(7, 'days').format(dateFormatYYYYMMDD),
        from.subtract(2, 'days').format(dateFormatYYYYMMDD),
        from.add(2, 'days').format(dateFormatYYYYMMDD),
        from.add(7, 'days').format(dateFormatYYYYMMDD),
        from.add(14, 'days').format(dateFormatYYYYMMDD),
    ];
}

const onChangePage = (currentDate, tab, direction) => {
    setMarkedDays(getMarkedDays(currentDate));
    setDisabledDays(getDisabledDays(currentDate));
}

<>
    <div>
        <label>
            <input type="checkbox" checked={selectRange} onChange={(e) => setSelectRange(e.target.checked)} />
            Выбор периода
        </label>
    </div>

    {
        selectRange
            ? (
                <Calendar.Range
                    onChangeRange={setCurrentRange}
                    pickedRange={currentRange}
                >
                    {
                        (props) => (
                            <Calendar
                                {...props}
                                key="first"
                                dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
                                monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
                                yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
                                prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
                                nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
                                changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
                            />
                        )
                    }
                    {
                        (props) => (
                            <Calendar
                                {...props}
                                key="second"
                                dayHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarDay'}}
                                monthHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarMonth'}}
                                yearHtmlAttributes={{'data-action': 'click', 'data-label': 'calendarYear'}}
                                prevButtonProps={{'data-action': 'click', 'data-label': 'calendarPrevButton'}}
                                nextButtonProps={{'data-action': 'click', 'data-label': 'calendarNextButton'}}
                                changeViewLinkProps={{'data-action': 'click', 'data-label': 'calendarChangeViewLink'}}
                            />
                        )
                    }
                </Calendar.Range>
            )
            : (
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
            )
    }
</>
```
