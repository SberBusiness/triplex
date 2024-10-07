import React, {useRef} from 'react';
import moment from 'moment/moment';
import {CalendarViewContext} from '@sberbusiness/triplex/components/Calendar/CalendarViewContext';
import {TPickedRange, TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';
import {ICalendarCommonProps} from '@sberbusiness/triplex/components/Calendar/Calendar';
import {CalendarViewDays} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewDays';
import {CalendarViewMonths} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewMonths';
import {CalendarViewYears} from '@sberbusiness/triplex/components/Calendar/components/CalendarViewYears';

/** Свойства компонента CalendarView. */
export interface ICalendarViewProps
    extends Pick<
            ICalendarCommonProps,
            'pickType' | 'disabledDays' | 'markedDays' | 'yearHtmlAttributes' | 'monthHtmlAttributes' | 'dayHtmlAttributes'
        >,
        Required<Pick<ICalendarCommonProps, 'limitRange' | 'onPageChange' | 'onViewChange'>> {
    /** Дочерние элементы. */
    children?: never;
    /** Вид отображения. */
    viewMode: ECalendarViewMode;
    /** Дата, являющая курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата. */
    pickedDate?: TPickedDate;
    /** Выбранный период. */
    pickedRange?: TPickedRange;
    /** Идентификатор для связи календаря и наименования текущего периода. */
    periodId: string;
    /** Функция, вызывающаяся при выборе даты. */
    onDateSelect: (date: moment.Moment) => void;
}

/** Вид календаря. */
export const CalendarView: React.FC<ICalendarViewProps> = ({
    viewMode,
    yearHtmlAttributes,
    monthHtmlAttributes,
    dayHtmlAttributes,
    ...rest
}) => {
    const viewItemFocusedRef = useRef(false);

    /** Рендер текущего вида календаря. */
    const renderCurrentView = () => {
        switch (viewMode) {
            case ECalendarViewMode.DAYS:
                return <CalendarViewDays dayHtmlAttributes={dayHtmlAttributes} {...rest} />;
            case ECalendarViewMode.MONTHS:
                return <CalendarViewMonths monthHtmlAttributes={monthHtmlAttributes} {...rest} />;
            case ECalendarViewMode.YEARS:
                return <CalendarViewYears yearHtmlAttributes={yearHtmlAttributes} {...rest} />;
        }
    };

    return <CalendarViewContext.Provider value={{viewItemFocusedRef}}>{renderCurrentView()}</CalendarViewContext.Provider>;
};
