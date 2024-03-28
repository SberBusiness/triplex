import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {DatePickerInputTarget} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerInput/components/DatePickerInputTarget';
import {DatePickerInputIcon} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerInput/components/DatePickerInputIcon';

/** Свойства компонента DatePickerInput. */
export interface IDateInputProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие DatePickerInput. */
export interface IDatePickerInputComposition {
    Target: typeof DatePickerInputTarget;
    Icon: typeof DatePickerInputIcon;
}

/** Поле ввода для компонента DatePicker. */
export const DatePickerInput: React.FC<IDateInputProps> & IDatePickerInputComposition = ({children, className, ...rest}) => {
    const classNames = classnames('cssClass[datePickerInput]', className);

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};

DatePickerInput.Target = DatePickerInputTarget;
DatePickerInput.Icon = DatePickerInputIcon;
