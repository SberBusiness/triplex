import React from 'react';
import {
    DatePickerTargetButton,
    IDatePickerTargetButtonProps,
} from '@sberbusiness/triplex/components/DatePicker/components/components/DatePickerTargetButton';

/** Свойства компонента MonthYearPickerTargetButton. */
export interface IMonthYearPickerTargetButtonProps extends IDatePickerTargetButtonProps {}

/** Кнопка компонента MonthYearPickerTarget. */
export const MonthYearPickerTargetButton = React.forwardRef<HTMLButtonElement, IMonthYearPickerTargetButtonProps>((props, ref) => (
    <DatePickerTargetButton role="presentation" tabIndex={-1} {...props} ref={ref} />
));

MonthYearPickerTargetButton.displayName = 'MonthYearPickerTargetButton';
