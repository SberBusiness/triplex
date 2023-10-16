import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Сайдбар поля ввода, отображается справа от поля ввода. Обычно содержит HelpBox. */
export const FormFieldSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({children, className, ...htmlDivAttributes}, ref) => (
        <div className={classnames('cssClass[formFieldSidebar]', className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    )
);

FormFieldSidebar.displayName = 'FormFieldSidebar';
