import {DAYS_SET} from '@sberbusiness/triplex/desktop/common/consts/DateConst';
import moment from 'moment';
import * as React from 'react';

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
            <td className="cssClass[calendarWeekCell]" key={`${day}-${i}`}>
                {moment()
                    .locale(locale)
                    .weekday(day)
                    .format('ddd')}
            </td>
        ))}
    </tr>
);
