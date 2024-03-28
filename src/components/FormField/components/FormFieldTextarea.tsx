import React, {FocusEventHandler, useContext, useEffect, useRef, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {INPUT_PADDING_X_DEFAULT} from '@sberbusiness/triplex/components/FormField/consts';
import {TextArea, ITextAreaProps} from '@sberbusiness/triplex/components/TextArea/TextArea';

/** Свойства компонента FormFieldTextarea. */
export interface IFormFieldTextareaProps extends ITextAreaProps {}

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    ({className, disabled, error, id, onBlur, onFocus, placeholder, style, value, ...htmlTextareaHTMLAttributes}, ref) => {
        const {focused, prefixWidth, postfixWidth, setDisabled, setFocused, setId, setValueExist} = useContext(FormFieldContext);
        const [paddingLeft, setPaddingLeft] = useState(INPUT_PADDING_X_DEFAULT);
        const [paddingRight, setPaddingRight] = useState(INPUT_PADDING_X_DEFAULT);
        const instanceId = useRef(id || uniqueId());
        const classNames = classnames('cssClass[formFieldTextarea]', {'cssClass[error]': !!error}, className);

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
            <TextArea
                {...htmlTextareaHTMLAttributes}
                id={instanceId.current}
                className={classNames}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder={focused ? placeholder : undefined}
                style={{paddingLeft, paddingRight, ...style}}
                value={value}
                ref={ref}
            />
        );
    }
);

FormFieldTextarea.displayName = 'FormFieldTextarea';
