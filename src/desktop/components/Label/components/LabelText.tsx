import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

interface ILabelTextProps extends React.HTMLAttributes<HTMLLabelElement> {
    /* Текст лейбла */
    children: string;
    htmlFor?: string;
}

/**
 * Компонент LabelText. Основной текст лейбла.
 */
export const LabelText: React.FC<ILabelTextProps> = ({children, className, htmlFor, ...htmlLabelAttributes}) => (
    <label htmlFor={htmlFor} className={classnames('cssClass[label]', className)} {...htmlLabelAttributes}>
        {children}
    </label>
);
