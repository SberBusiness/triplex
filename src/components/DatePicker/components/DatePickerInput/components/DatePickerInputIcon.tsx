import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';

/** Свойства компонента DatePickerInputIcon. */
export interface IDatePickerInputIconProps extends IButtonIconProps {}

/** Кнопка-иконка календаря компонента DatePicker. */
export const DatePickerInputIcon: React.FC<IDatePickerInputIconProps> = ({className, active, disabled, ...rest}) => {
    const classNames = classnames('cssClass[datePickerInputIcon]', {'cssClass[active]': !!active}, className);

    return (
        <ButtonIcon className={classNames} active={active} disabled={disabled} {...rest}>
            <CalendarSrvIcon20 />
        </ButtonIcon>
    );
};
