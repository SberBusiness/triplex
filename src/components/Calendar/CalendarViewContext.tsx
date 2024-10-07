import React from 'react';

/** Свойства контекста CalendarView. */
interface ICalendarViewContext {
    viewItemFocusedRef: React.MutableRefObject<boolean>;
}

/** Контекст компонента CalendarView. */
export const CalendarViewContext = React.createContext<ICalendarViewContext>({
    viewItemFocusedRef: {current: false},
});
