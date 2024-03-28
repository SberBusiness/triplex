import React, {FocusEventHandler, useContext, useEffect} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ISelectProps} from '@sberbusiness/triplex/components/Select/Select';
import {SelectBase} from '../../SelectBase/SelectBase';
import {FormFieldContext} from '../FormFieldContext';

export interface IFormFieldSelectProps extends ISelectProps {}

/** Компонент, отображающий select. */
export const FormFieldSelect: React.FC<IFormFieldSelectProps> = ({
    className,
    onBlur,
    onFocus,
    placeholder,
    targetProps,
    value,
    ...selectProps
}) => {
    const selectClassNames = classnames('cssClass[formFieldSelect]', className);
    const selectTargetClassNames = classnames('cssClass[formFieldSelectTarget]', targetProps?.className, className);
    const {focused, setFocused, setValueExist} = useContext(FormFieldContext);

    useEffect(() => {
        setValueExist(Boolean(value));
    }, [setValueExist, value]);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        setFocused(false);
        onBlur?.(event);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
        setFocused(true);
        onFocus?.(event);
    };

    // TODO. Добавить возможность передавать в рендер функцию любой select, например SelectExtended.
    return (
        <SelectBase
            targetProps={{
                ...targetProps,
                className: selectTargetClassNames,
            }}
            dropdownListItemClassName="cssClass[formFieldSelectDropdownListItem]"
            {...selectProps}
            className={selectClassNames}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={value}
            placeholder={focused ? placeholder : undefined}
        />
    );
};

FormFieldSelect.displayName = 'FormFieldSelect';
