import React, {useEffect, useRef} from 'react';
import {IInputProps, Input} from '@sberbusiness/triplex/components/Input/Input';
import {getCaretPosition, setCaretPosition} from '@sberbusiness/triplex/utils/inputUtils';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';
import {AmountBaseInputCore} from './AmountBaseInputCore';

/** Свойства компонента AmountBaseInput. */
interface IAmountBaseInputProps extends Omit<IInputProps, 'type' | 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    /** Количество знаков после запятой. */
    fractionLength?: number;
}

/** База для поля ввода суммы. */
export const AmountBaseInput = React.forwardRef<HTMLInputElement, IAmountBaseInputProps>(
    ({value, placeholder, maxLength = 24, onKeyDown, onClick, fractionLength = 2, onChange, ...rest}, ref) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const core = useRef(new AmountBaseInputCore(maxLength, fractionLength));
        const cached = useRef({value: '', formattedValue: '', caret: -1, key: '', noTextSelected: false});

        useEffect(() => {
            if (inputRef.current == document.activeElement) {
                setCaretPosition(inputRef.current, Math.max(core.current.caret, 0));
            }
        }, [value]);

        useEffect(() => {
            core.current = new AmountBaseInputCore(maxLength, fractionLength);
        }, [maxLength, fractionLength]);

        /** Функция, возвращающая отформатированное значение. */
        const getFormattedValue = (): string => {
            if (value != cached.current.value) {
                core.current.apply(value, value.length);
                cached.current.value = core.current.value;
            }

            cached.current.formattedValue = core.current.formattedValue;

            return core.current.formattedValue;
        };

        /** Обработчик изменения значения. */
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const caret = getCaretPosition(event.target);

            core.current.apply(event.target.value, caret);

            cached.current.value = core.current.value;

            setFallbackCaret(caret);

            onChange(core.current.value);
        };

        /** Установка каретки на случай, если не произойдёт изменения значения. */
        const setFallbackCaret = (caret: number) => {
            const {formattedValue, caret: cachedCaret, key, noTextSelected} = cached.current;

            inputRef.current!.value = formattedValue;

            if (noTextSelected) {
                // Если была нажата клавиша Backspace, и каретка находится перед групповым разделителем, либо после целой части – сдвигаем каретку назад.
                if (
                    isKey(key, 'BACKSPACE') &&
                    (formattedValue[caret] == ' ' ||
                        formattedValue[caret] == AmountConst.DecimalComma ||
                        formattedValue.length - fractionLength < cachedCaret)
                )
                    return setCaretPosition(inputRef.current, cachedCaret - 1);
                // Если была введена точка/запятая перед десятичным разделителем – сдвигаем каретку вперёд.
                if (
                    (key == AmountConst.DecimalComma || key == AmountConst.DecimalPoint) &&
                    formattedValue[cachedCaret] == AmountConst.DecimalComma
                )
                    return setCaretPosition(inputRef.current, cachedCaret + 1);
            }

            // Если каретка находится после десятичного разделителя.
            if (fractionLength > 0 && formattedValue.length - fractionLength - 1 < cachedCaret) {
                return setCaretPosition(inputRef.current, core.current.caret);
            }

            // В остальных случаях: ставим каретку на прежнее место.
            setCaretPosition(inputRef.current, cachedCaret);
        };

        /** Обработчик нажатия клавиши. */
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            cached.current.caret = getCaretPosition(event.currentTarget);
            cached.current.key = event.key;
            cached.current.noTextSelected = event.currentTarget.selectionStart == event.currentTarget.selectionEnd;
            onKeyDown?.(event);
        };

        /** Обработчик клика. */
        const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
            cached.current.caret = getCaretPosition(event.currentTarget);
            cached.current.key = '';
            cached.current.noTextSelected = event.currentTarget.selectionStart == event.currentTarget.selectionEnd;
            onClick?.(event);
        };

        /** Функция для хранения ссылки. */
        const setRef = (instance: HTMLInputElement | null) => {
            inputRef.current = instance;
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <Input
                value={getFormattedValue()}
                placeholder={placeholder || core.current.placeholder}
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                {...rest}
                ref={setRef}
            />
        );
    }
);

AmountBaseInput.displayName = 'AmountBaseInput';
