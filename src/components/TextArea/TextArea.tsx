import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TextArea. */
export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Признак ошибки ввода данных. */
    error?: boolean;
    /** Указывает, можно ли пользователю изменять размеры текстового поля. (http://htmlbook.ru/css/resize). */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';
}

/** Компонент поля ввода многострочного текста. */
export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
    ({className, cols, style, error, resize = 'none', ...props}, ref) => {
        const classNames = classnames('cssClass[textArea]', {'cssClass[error]': Boolean(error), 'cssClass[fullWidth]': !cols}, className);

        return (
            <textarea
                className={classNames}
                cols={cols}
                style={{...style, resize: resize}}
                {...props}
                ref={ref}
                data-tx={process.env.npm_package_version}
            />
        );
    }
);

TextArea.displayName = 'TextArea';
