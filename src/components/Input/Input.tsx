import React from 'react';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента "Поле для ввода информации". */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Состояние ошибки. */
    error?: boolean;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/** Компонент "Поле для ввода информации". */
export const Input = React.forwardRef<HTMLInputElement, IInputProps>(({className, groupPosition, error, ...rest}, ref) => {
    const classNames = classnames(
        'cssClass[input]',
        {'cssClass[grouped]': !!groupPosition},
        groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
        {'cssClass[error]': !!error},
        className
    );

    return <input className={classNames} {...rest} ref={ref} data-tx={process.env.npm_package_version} />;
});

Input.displayName = 'Input';
