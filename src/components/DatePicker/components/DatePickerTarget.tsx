import React from 'react';
import {DatePickerTargetInput} from '@sberbusiness/triplex/components/DatePicker/components/components/DatePickerTargetInput';
import {DatePickerTargetButton} from '@sberbusiness/triplex/components/DatePicker/components/components/DatePickerTargetButton';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента DatePickerTarget. */
export interface IDatePickerTarget extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие DatePickerTarget. */
interface IDatePickerTargetComposition {
    Input: typeof DatePickerTargetInput;
    Button: typeof DatePickerTargetButton;
}

/** Управляющий элемент компонента DatePicker. */
export const DatePickerTarget: React.FC<IDatePickerTarget> & IDatePickerTargetComposition = ({className, ...rest}) => (
    <div className={classnames('cssClass[datePickerTarget]', className)} {...rest} />
);

DatePickerTarget.Input = DatePickerTargetInput;
DatePickerTarget.Button = DatePickerTargetButton;
