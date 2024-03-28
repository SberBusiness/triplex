import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента LabelText. */
interface ILabelTextProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/** Основной текст лейбла. */
export const LabelText: React.FC<ILabelTextProps> = ({children, className, ...htmlLabelAttributes}) => (
    <label className={classnames('cssClass[label]', className)} {...htmlLabelAttributes}>
        {children}
    </label>
);
