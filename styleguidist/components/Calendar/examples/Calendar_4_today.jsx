import React, {useState} from 'react';
import {Calendar} from '@sberbusiness/triplex/components/Calendar/Calendar';

const [pickedDate, setPickedDate] = useState(null);

<Calendar
    pickedDate={pickedDate}
    onDateChange={setPickedDate}
    todayButtonProps={({currentPeriodSelected}) => ({
        children: currentPeriodSelected ? 'Сегодня' : 'К текущей дате',
    })}
/>