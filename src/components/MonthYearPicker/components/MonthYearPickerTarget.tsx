import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {MonthYearPickerTargetInput} from '@sberbusiness/triplex/components/MonthYearPicker/components/components/MonthYearPickerTargetInput';
import {MonthYearPickerTargetButton} from '@sberbusiness/triplex/components/MonthYearPicker/components/components/MonthYearPickerTargetButton';

/** Свойства компонента MonthYearPickerTarget. */
export interface IMonthYearPickerTarget extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие MonthYearPickerTarget. */
interface IMonthYearPickerTargetComposition {
    Input: typeof MonthYearPickerTargetInput;
    Button: typeof MonthYearPickerTargetButton;
}

/** Управляющий элемент компонента MonthYearPicker. */
export const MonthYearPickerTarget: React.FC<IMonthYearPickerTarget> & IMonthYearPickerTargetComposition = ({className, ...rest}) => (
    <div className={classnames('cssClass[monthYearPickerTarget]', className)} {...rest} />
);

MonthYearPickerTarget.Input = MonthYearPickerTargetInput;
MonthYearPickerTarget.Button = MonthYearPickerTargetButton;
