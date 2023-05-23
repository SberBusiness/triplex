import React from 'react';
import {TIndentSize} from '@sberbusiness/triplex/desktop/common/consts/IndentConst';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {cssClass} from '@sberbusiness/triplex/desktop/utils/cssClass';

/** Свойства компонента RadioXGroup. */
export interface IRadioXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер отступа. */
    indent?: TIndentSize;
}

/** Группа радио-кнопок с направлением по оси X. */
export const RadioXGroup: React.FC<IRadioXGroupProps> = (props) => {
    const {children, className, indent = 12, ...rest} = props;
    const classNames = classnames('cssClass[radioXGroup]', cssClass(`indent-${indent}`), className);

    return (
        <div className={classNames} role="radiogroup" {...rest}>
            {children}
        </div>
    );
};

RadioXGroup.displayName = 'RadioXGroup';
