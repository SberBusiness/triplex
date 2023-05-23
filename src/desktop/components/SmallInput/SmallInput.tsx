import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Свойства SmallInput.
 */
export interface ISmallInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Компонент "Уменьшенное поле ввода". Используется в HeaderPage.
 */
export const SmallInput: React.FC<ISmallInputProps> = ({className, ...inputHTMLAttributes}) => (
    <input {...inputHTMLAttributes} type="text" className={classnames(className, 'cssClass[smallInput]')} />
);

SmallInput.displayName = 'SmallInput';
