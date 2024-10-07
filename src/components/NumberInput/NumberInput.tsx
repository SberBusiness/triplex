import React from 'react';
import {Input, IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {getCaretPosition, setCaretPosition} from '@sberbusiness/triplex/utils/inputUtils';
import {StringUtils} from '@sberbusiness/triplex/utils/stringUtils';
import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';

/** Свойства NumberInput. */
export interface INumberInputProps extends Omit<IInputProps, 'type'> {}

/** Поле ввода числа. */
export const NumberInput = React.forwardRef<HTMLInputElement, INumberInputProps>(({onChange, ...rest}, ref) => {
    /** Обработчик изменения значения. */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const caret = getCaretPosition(event.target);
        const value = getFilteredValue(event.target.value, caret);
        const caretShift = value.length - event.target.value.length;

        event.target.value = value;

        setCaretPosition(event.target, caret + caretShift);

        onChange?.(event);
    };

    /** Функция, возвращающая отфильтрованное значение. */
    const getFilteredValue = (value: string, caret: number): string => {
        const buffer: string[] = [];
        const length = value.length;
        let separatorIndex = -1;

        for (let i = 0; i < length; i++) {
            if (StringUtils.isDigit(value[i])) {
                buffer.push(value[i]);
            } else if (StringUtils.isDecimalSeparator(value[i])) {
                if (separatorIndex == -1) {
                    buffer.push(AmountConst.DecimalComma);
                    separatorIndex = buffer.length - 1;
                } else if (i > caret) {
                    buffer.push(AmountConst.DecimalComma);
                    buffer[separatorIndex] = '';
                    separatorIndex = buffer.length - 1;
                }
            } else if (i === 0 && StringUtils.isUnaryMinus(value[i])) {
                buffer.push('-');
            }
        }

        return buffer.join('');
    };

    return <Input onChange={handleChange} inputMode="decimal" {...rest} ref={ref} />;
});

NumberInput.displayName = 'NumberInput';
