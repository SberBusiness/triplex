import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React from 'react';

/**
 * @prop {boolean} [error] Признак ошибки ввода данных.
 * @prop {'none' | 'both' | 'horizontal' | 'vertical' | 'inherit'} [resize] Указывает, можно ли пользователю изменять размеры текстового поля. (http://htmlbook.ru/css/resize).
 */
export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';
}

/** Компонент поля ввода многострочного текста. */

export const TextArea: React.FC<ITextAreaProps> = ({cols, className, error, resize = 'none', ...props}) => {
    const cn = classnames(className, 'cssClass[textArea]', {
        'cssClass[error]': Boolean(error),
        'cssClass[fullWidth]': !cols,
    });
    return <textarea {...props} cols={cols} className={cn} style={{resize: resize}} />;
};

TextArea.displayName = 'TextArea';
