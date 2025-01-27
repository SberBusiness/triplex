import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FormGroup. */
interface IFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент, объединяющий FormField, HelpBox, Alert, Description.
 * Дочерние элементы, передаются декларативно, это позволяет их кастомизировать и передавать data-атрибуты.
 */
export const FormGroup = React.forwardRef<HTMLDivElement, IFormGroupProps>(({children, className, ...htmlDivAttributes}, ref) => (
    <div className={classnames('cssClass[formGroup]', className)} ref={ref} {...htmlDivAttributes}>
        {children}
    </div>
));

FormGroup.displayName = 'FormGroup';
