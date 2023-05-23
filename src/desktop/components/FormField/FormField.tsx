import React, {useState} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {FormFieldContext} from './FormFieldContext';
import {INPUT_PADDING_X_DEFAULT} from './consts';

interface IFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент, отображающий input/select/textarea + label.
 */
export const FormField: React.FC<IFormFieldProps> = ({children, className, onMouseEnter, onMouseLeave, ...htmlDivAttributes}) => {
    const [disabled, setDisabled] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [id, setId] = useState('');
    const [postfixWidth, setPostfixWidth] = useState(INPUT_PADDING_X_DEFAULT);
    const [prefixWidth, setPrefixWidth] = useState(INPUT_PADDING_X_DEFAULT);
    const [valueExist, setValueExist] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
    };

    return (
        <FormFieldContext.Provider
            value={{
                disabled,
                focused,
                hovered,
                id,
                postfixWidth,
                prefixWidth,
                setDisabled,
                setFocused,
                setId,
                setPostfixWidth,
                setPrefixWidth,
                setValueExist,
                valueExist,
            }}
        >
            <div
                className={classnames('cssClass[formField]', className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};
