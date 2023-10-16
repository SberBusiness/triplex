import {ICalendarCommonProps} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {ICalendarProvideProps, TPickedRange, TPickedRangeProp} from '@sberbusiness/triplex/components/Calendar/types';
import React from 'react';
import moment, {Moment} from 'moment';

export interface ICalendarRangeProps extends ICalendarCommonProps {
    children: [(props: ICalendarProvideProps) => React.ReactNode, (props: ICalendarProvideProps) => React.ReactNode];
    /** Дата календаря по умолчанию. */
    defaultDate?: Moment;
    /** Обработчик изменения периода. */
    onChangeRange: (date: TPickedRange) => void;
    /** Выбранный период. */
    pickedRange: TPickedRangeProp;
}

export const CalendarRange: React.FC<ICalendarRangeProps> = ({children, defaultDate, onChangeRange, pickedRange, ...commonProps}) => (
    <>
        {children[0]({
            ...commonProps,
            defaultDate: defaultDate ?? moment(),
            onChangeDate: onChangeRange,
            pickedDate: pickedRange,
        })}
        {children[1]({
            ...commonProps,
            defaultDate: (defaultDate ?? moment()).add(1, 'month'),
            onChangeDate: onChangeRange,
            pickedDate: pickedRange,
        })}
    </>
);
