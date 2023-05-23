import * as React from 'react';
import {TIndentSize} from '@sberbusiness/triplex/desktop/common/consts/IndentConst';
import {cssClass} from '@sberbusiness/triplex/desktop/utils/cssClass';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства компонента CheckboxXGroup. */
export interface ICheckboxXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер отступа. */
    indent?: TIndentSize;
}

/** Группа чекбоксов с направлением по оси X. */
export const CheckboxXGroup: React.FC<ICheckboxXGroupProps> = (props) => {
    const {children, className, indent = 12, ...rest} = props;
    const classNames = classnames('cssClass[checkboxXGroup]', cssClass(`indent-${indent}`), className);

    return (
        <div className={classNames} role="group" {...rest}>
            {children}
        </div>
    );
};

CheckboxXGroup.displayName = 'CheckboxXGroup';
