import React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Элемент, объединяющий FormField, HelpBox, Alert, Description.
 * Дочерние элементы, передаются декларативно, это позволяет их кастомизировать и передавать data-атрибуты.
 */
export const FormGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({children, className, ...htmlDivAttributes}, ref) => (
        <div className={classnames('cssClass[formGroup]', className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    )
);

FormGroup.displayName = 'FormGroup';
