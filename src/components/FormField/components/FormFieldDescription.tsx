import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FormFieldDescription. */
export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние ошибки. */
    error?: boolean;
}

/** Отображает дополнительную информацию под полем ввода. */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({children, className, error, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[formFieldDescription]', {'cssClass[error]': Boolean(error)}, className)} {...htmlDivAttributes}>
        {children}
    </div>
);

FormFieldDescription.displayName = 'FormFieldDescription';
