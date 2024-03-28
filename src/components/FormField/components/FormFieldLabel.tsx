import React, {useContext, useEffect, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';
import {INPUT_PADDING_X_DEFAULT} from '@sberbusiness/triplex/components/FormField/consts';

/** Свойства компонента FormFieldLabel. */
interface IFormFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/** Лейбл поля ввода/селекта. Отображается по-середине поля ввода, когда инпут/селект имеет значение или фокус, перемещается в верхний левый угол. */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, IFormFieldLabelProps>(
    ({children, className, style, ...htmlLabelAttributes}, ref) => {
        const {disabled, focused, id, prefixWidth, postfixWidth, valueExist} = useContext(FormFieldContext);
        // Label отображается в уменьшенном виде над полем ввода/селектом.
        const [floating, setFloating] = useState(false);

        useEffect(() => {
            setFloating(focused || valueExist);
        }, [focused, valueExist]);

        const classNames = classnames(
            'cssClass[formFieldLabel]',
            {'cssClass[disabled]': disabled, 'cssClass[floating]': floating},
            className
        );

        const styles = {
            // Левая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            left: floating ? INPUT_PADDING_X_DEFAULT : prefixWidth,
            // Правая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            right: floating ? INPUT_PADDING_X_DEFAULT : postfixWidth,
            ...style,
        };

        return (
            <label className={classNames} ref={ref} htmlFor={id} {...htmlLabelAttributes} style={styles}>
                <span className="cssClass[formFieldLabelText]">{children}</span>
            </label>
        );
    }
);

FormFieldLabel.displayName = 'FormFieldLabel';
