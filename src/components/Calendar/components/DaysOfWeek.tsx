import {DAYS_SET} from '@sberbusiness/triplex/consts/DateConst';
import moment from 'moment';
import React from 'react';

/**
 * @prop {string} locale Локализация библиотеки momentJs.
 */
interface IDaysOfWeekProps {
    locale: string;
}

/** Дни недели. */
export const DaysOfWeek: React.FC<IDaysOfWeekProps> = ({locale}): JSX.Element => (
    <tr className="cssClass[calendarWeekRow]">
        {DAYS_SET.map((day, i) => (
            <th className="cssClass[calendarWeekCell]" key={`${day}-${i}`} abbr={moment().locale(locale).weekday(day).format('dddd')}>
                {moment().locale(locale).weekday(day).format('ddd')}
            </th>
        ))}
    </tr>
);
