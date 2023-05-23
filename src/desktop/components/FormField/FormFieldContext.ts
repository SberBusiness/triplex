import React from 'react';

export interface IFormFieldContext {
    // Поле в состоянии disabled.
    disabled: boolean;
    // Поле в фокусе.
    focused: boolean;
    // Поле в состоянии hover.
    hovered: boolean;
    // ID поля ввода.
    id: string;
    // Ширина элемента FormFieldPostfix.
    postfixWidth: number;
    // Ширина элемента FormFieldPrefix.
    prefixWidth: number;
    // Установка значения disabled.
    setDisabled: (disabled: boolean) => void;
    // Установка значения focused.
    setFocused: (focused: boolean) => void;
    // Установка значения id.
    setId: (id: string) => void;
    // Установка значения postfixWidth.
    setPostfixWidth: (postfixWidth: number) => void;
    // Установка значения prefixWidth.
    setPrefixWidth: (prefixWidth: number) => void;
    // Установка значения valueExist.
    setValueExist: (valueExist: boolean) => void;
    // Поле имеет значение, в этом случае label перемещается вверх над значением.
    valueExist: boolean;
}

export const initialFormFieldContextContext: IFormFieldContext = {
    disabled: false,
    focused: false,
    hovered: false,
    id: '',
    postfixWidth: 0,
    prefixWidth: 0,
    valueExist: false,
    setDisabled: () => {},
    setFocused: () => {},
    setId: () => {},
    setPostfixWidth: () => {},
    setPrefixWidth: () => {},
    setValueExist: () => {},
};

/**
 * Контекст поля ввода.
 */
export const FormFieldContext = React.createContext<IFormFieldContext>(initialFormFieldContextContext);
