import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента CheckboxYGroup. */
export interface ICheckboxYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Группа чекбоксов с направлением по оси Y. */
export const CheckboxYGroup: React.FC<ICheckboxYGroupProps> = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[checkboxYGroup]', className);

    return (
        <div className={classNames} role="group" {...rest}>
            {children}
        </div>
    );
};

CheckboxYGroup.displayName = 'CheckboxYGroup';
