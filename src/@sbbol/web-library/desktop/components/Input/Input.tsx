import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * @prop {Function} [setInputRef] Функция для присваивания ссылки на поле ввода.
 * @prop {boolean} [error] Признак ошибки ввода данных.
 * @prop {'text' | 'password' | 'email' | 'search' | 'tel' | 'url'} [type] HTML-атрибут type.
 */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setInputRef?: (ref: HTMLInputElement) => void;
    error?: boolean;
    type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';
}

/**
 * Компонент "Стандартное поле для ввода текста".
 */
export class Input extends React.PureComponent<IInputProps> {
    public static displayName = 'Input';

    public static defaultProps = {
        type: 'text',
    };

    public render(): JSX.Element {
        const {className, placeholder, setInputRef, error, ...props} = this.props;
        const inputClass = classnames(className, 'cssClass[input]', {'cssClass[error]': Boolean(error)});
        return <input {...props} ref={setInputRef} className={inputClass} placeholder={placeholder ?? 'Введите значение'} />;
    }
}
