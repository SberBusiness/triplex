import React from 'react';

/** Свойства компонента CalendarFooter. */
export interface ICalendarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер календаря. */
export const CalendarFooter: React.FC<ICalendarFooterProps> = ({children}) => <div className="cssClass[calendarFooter]">{children}</div>;

CalendarFooter.displayName = 'CalendarFooter';
