import React, {FocusEventHandler, useContext, useEffect, useRef, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {INPUT_PADDING_X_DEFAULT} from '@sberbusiness/triplex/components/FormField/consts';

export interface IFormFieldTextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    /** Состояние ошибки. */
    error?: boolean;
}

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    ({className, disabled, error, id, onBlur, onFocus, placeholder, style, value, ...htmlInputHTMLAttributes}, ref) => {
        const {focused, prefixWidth, postfixWidth, setDisabled, setFocused, setId, setValueExist} = useContext(FormFieldContext);
        const classNames = classnames('cssClass[formFieldTextarea]', {'cssClass[error]': !!error}, className);
        const [paddingLeft, setPaddingLeft] = useState(INPUT_PADDING_X_DEFAULT);
        const [paddingRight, setPaddingRight] = useState(INPUT_PADDING_X_DEFAULT);
        const instanceId = useRef(id || uniqueId());

        useEffect(() => {
            setId(instanceId.current);
        }, [setId]);

        useEffect(() => {
            if (id) {
                instanceId.current = id;
                setId(instanceId.current);
            }
        }, [id, setId]);

        useEffect(() => {
            setPaddingLeft(prefixWidth);
        }, [prefixWidth]);

        useEffect(() => {
            setPaddingRight(postfixWidth);
        }, [postfixWidth]);

        useEffect(() => {
            setDisabled(Boolean(disabled));
        }, [disabled, setDisabled]);

        useEffect(() => {
            setValueExist(Boolean(value));
        }, [setValueExist, value]);

        const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
            setFocused(false);
            onBlur?.(event);
        };

        const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (event) => {
            setFocused(true);
            onFocus?.(event);
        };

        return (
            <textarea
                ref={ref}
                {...htmlInputHTMLAttributes}
                id={instanceId.current}
                className={classNames}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder={focused ? placeholder : undefined}
                style={{paddingLeft, paddingRight, ...style}}
                value={value}
            />
        );
    }
);

FormFieldTextarea.displayName = 'FormFieldTextArea';
