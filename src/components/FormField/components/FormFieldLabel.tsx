import React, {useContext, useEffect, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {INPUT_PADDING_X_DEFAULT} from '@sberbusiness/triplex/components/FormField/consts';

/** Лейбл поля ввода/селекта. Отображается по-середине поля ввода, когда инпут/селект имеет значение или фокус, перемещается в верхний левый угол. */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({children, className, style, ...htmlLabelAttributes}, ref) => {
        const {disabled, focused, id, prefixWidth, postfixWidth, valueExist} = useContext(FormFieldContext);
        // Label отображается в уменьшенном виде над полем ввода/селектом.
        const [smallLabel, setSmallLabel] = useState(false);

        useEffect(() => {
            setSmallLabel(focused || valueExist);
        }, [focused, valueExist]);

        const classNames = classnames(
            'cssClass[formFieldLabel]',
            {
                // Инпут в фокусе или имеет value.
                'cssClass[smallLabel]': smallLabel,
            },
            className
        );

        const styles = {
            // Левая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            left: smallLabel ? INPUT_PADDING_X_DEFAULT : prefixWidth,
            // Правая позиция элемента. Когда label по-середине инпута, позиция учитывает иконки по краям, когда сверху, позиция на все ширину поля ввода.
            right: smallLabel ? INPUT_PADDING_X_DEFAULT : postfixWidth,
            ...style,
        };

        return (
            <label className={classNames} ref={ref} htmlFor={id} {...htmlLabelAttributes} style={styles}>
                {smallLabel ? (
                    <Text size={ETextSize.B2} type={EFontType.SECONDARY} className="cssClass[smallLabelText]">
                        {children}
                    </Text>
                ) : (
                    <Text size={ETextSize.B1} type={EFontType.SECONDARY} className={classnames({'cssClass[disabled]': disabled})}>
                        {children}
                    </Text>
                )}
            </label>
        );
    }
);

FormFieldLabel.displayName = 'FormFieldLabel';
