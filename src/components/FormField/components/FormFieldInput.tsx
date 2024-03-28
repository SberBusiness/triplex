import React, {useState, useEffect, useContext, useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FormFieldContext} from '../FormFieldContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {INPUT_PADDING_X_DEFAULT} from '@sberbusiness/triplex/components/FormField/consts';
import {Input, IInputProps} from '@sberbusiness/triplex/components/Input/Input';

/** Свойства, передаваемые в рендер-функцию IFormFieldInputProps. */
export interface IFormFieldInputProvideProps extends Omit<IFormFieldInputProps, 'render'> {}

/** Свойства компонента FormFieldInput. */
export interface IFormFieldInputProps extends Omit<IInputProps, 'groupPosition'> {
    /** Рендер-функция, в которую можно передать любой инпут с нужным функционалом (валидация ввода, маска).
     *  Через аргументы props инпуту передастся нужная стилизация.
     * */
    render?: (props: IFormFieldInputProvideProps, ref?: React.ForwardedRef<HTMLInputElement>) => React.ReactElement | null;
}

/** Компонент, отображающий input. */
export const FormFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>((props, ref) => {
    const {className, disabled, error, id, onBlur, onFocus, placeholder, style, value} = props;
    const {render, ...renderProvideProps} = props;
    const {focused, prefixWidth, postfixWidth, setDisabled, setFocused, setId, setValueExist} = useContext(FormFieldContext);
    const classNames = classnames('cssClass[formFieldInput]', {'cssClass[error]': !!error}, className);
    const [paddingLeft, setPaddingLeft] = useState(INPUT_PADDING_X_DEFAULT);
    const [paddingRight, setPaddingRight] = useState(INPUT_PADDING_X_DEFAULT);
    const instanceId = useRef(id || uniqueId('input_'));

    useEffect(() => {
        setId(instanceId.current);
    }, []);

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

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    };

    if (render) {
        // Рендер инпута, переданного снаружи.
        return render(
            {
                ...renderProvideProps,
                id: instanceId.current,
                className: classNames,
                onFocus: handleFocus,
                onBlur: handleBlur,
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder: focused ? placeholder : ' ',
                style: {paddingLeft, paddingRight, ...style},
            },
            ref
        );
    } else {
        // Рендер текстового инпута по-умолчанию.
        return (
            <Input
                className={classNames}
                {...props}
                id={instanceId.current}
                onFocus={handleFocus}
                onBlur={handleBlur}
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder={focused ? placeholder : undefined}
                style={{paddingLeft, paddingRight, ...style}}
                ref={ref}
            />
        );
    }
});

FormFieldInput.displayName = 'FormFieldInput';
