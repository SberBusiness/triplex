import {Ref} from '@sbbol/web-library/common/types/Ref';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Свойства компонента.
 */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    getRef?: Ref<HTMLInputElement>;
    error?: boolean;
}

/**
 * Компонент Input.
 */
export const Input: React.FC<IInputProps> = ({className, error, getRef, ...HTMLInputAttributes}) => (
    <input
        {...HTMLInputAttributes}
        type="text"
        className={classnames(className, 'cssClass[mobileInput]', {'cssClass[error]': Boolean(error)})}
        ref={getRef}
    />
);

Input.displayName = 'Input';
