import React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства компонента RadioYGroup. */
export interface IRadioYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Группа радио-кнопок с направлением по оси Y. */
export const RadioYGroup: React.FC<IRadioYGroupProps> = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[radioYGroup]', className);

    return (
        <div className={classNames} role="radiogroup" {...rest}>
            {children}
        </div>
    );
};

RadioYGroup.displayName = 'RadioYGroup';
