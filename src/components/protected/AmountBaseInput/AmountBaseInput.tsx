import React, {useRef, useMemo, useLayoutEffect} from 'react';
import {IInputProps, Input} from '@sberbusiness/triplex/components/Input/Input';
import {setCaretPosition} from '@sberbusiness/triplex/utils/inputUtils';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';
import {StringUtils} from '@sberbusiness/triplex/utils/stringUtils';
import {AmountBaseInputCore} from './AmountBaseInputCore';

/** Свойства компонента AmountBaseInput. */
interface IAmountBaseInputProps extends Omit<IInputProps, 'type' | 'maxLength' | 'onChange'> {
    /** Значение. */
    value: string;
    /** Максимальное количество знаков перед запятой. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. */
    fractionDigits?: number;
    /** Обработчик изменения значения. */
    onChange: (value: string) => void;
}

/** База для поля ввода суммы. */
export const AmountBaseInput = React.forwardRef<HTMLInputElement, IAmountBaseInputProps>(
    ({value, placeholder, onKeyDown, onSelect, maxIntegerDigits = 16, fractionDigits = 2, onChange, ...rest}, ref) => {
        const core = useRef(new AmountBaseInputCore(maxIntegerDigits, fractionDigits));
        const inputRef = useRef<HTMLInputElement | null>(null);

        useLayoutEffect(() => {
            if (inputRef.current == document.activeElement) {
                setCaretPosition(inputRef.current, Math.max(core.current.caret, 0));
            }
        }, [value]);

        /** Функция, возвращающая отформатированное значение. */
        const getFormattedValue = () => {
            if (
                value != core.current.value ||
                maxIntegerDigits != core.current.maxIntegerDigits ||
                fractionDigits != core.current.fractionDigits
            ) {
                core.current.maxIntegerDigits = maxIntegerDigits;
                core.current.fractionDigits = fractionDigits;
                core.current.apply(value, value.length);
            }

            core.current.cache.formattedValue = core.current.formattedValue;

            return core.current.formattedValue;
        };

        /** Текст подсказки по-умолчанию. */
        const defaultPlaceholder = useMemo(() => {
            const buffer: string[] = [];

            buffer.push('0');
            if (fractionDigits > 0) {
                buffer.push(AmountConst.DecimalComma);
                for (let i = 0; i < fractionDigits; i++) {
                    buffer.push('0');
                }
            }

            return buffer.join('');
        }, [fractionDigits]);

        /** Обработчик изменения значения. */
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const caret = event.target.selectionStart ?? event.target.value.length;

            core.current.apply(event.target.value, caret);

            setFallbackCaret(event.target);

            onChange(core.current.value);
        };

        /**
         * Установка каретки на случай, если не произойдёт изменения значения.
         *
         * Значение может не измениться по двум причинам:
         *     1) Значение невалидно. Обработчик снаружи не обновляет состояние;
         *     2) Значение идентично предыдущему. Обработчик снаружи [не] обновляет состояние.
         **/
        const setFallbackCaret = (input: HTMLInputElement) => {
            const {formattedValue, key, selectionStart, selectionEnd, selectionDirection} = core.current.cache;

            input.value = formattedValue;

            if (selectionStart == null || selectionEnd == null || selectionDirection == null) {
                return;
            }

            if (key == AmountConst.DecimalComma || key == AmountConst.DecimalPoint) {
                // Если каретка находится непосредственно перед десятичным разделителем, сдвигаем каретку вперёд.
                if (selectionStart == selectionEnd && formattedValue[selectionStart] == AmountConst.DecimalComma) {
                    return input.setSelectionRange(selectionStart + 1, selectionStart + 1);
                }
            } else if (isKey(key, 'BACKSPACE')) {
                if (selectionStart == selectionEnd) {
                    // Если каретка стоит непосредственно после группового/десятичного разделителя, сдвигаем каретку назад.
                    if (StringUtils.isDigit(formattedValue[selectionStart - 1]) == false) {
                        return input.setSelectionRange(selectionStart - 1, selectionEnd - 1);
                    }
                }
                // Если есть выделенный текст, ставим каретку в начало выделения.
                else {
                    // Ставим каретку в начало выделения.
                    return input.setSelectionRange(selectionStart, selectionStart);
                }
            } else if (isKey(key, 'DELETE')) {
                if (selectionStart == selectionEnd) {
                    // Если каретка стоит непосредственно перед групповым/десятичным разделителем, сдвигаем каретку вперёд.
                    if (StringUtils.isDigit(formattedValue[selectionStart]) == false) {
                        return input.setSelectionRange(selectionStart + 1, selectionEnd + 1);
                    }
                }
                // Если есть выделенный текст, ставим каретку в конец выделения.
                else {
                    return input.setSelectionRange(selectionEnd, selectionEnd);
                }
            }

            // Если каретка находится после десятичного разделителя.
            if (fractionDigits > 0 && formattedValue.length - fractionDigits - 1 < selectionStart) {
                // Если новое значение повторяет старое, ставим каретку в расчётное место.
                if (core.current.formattedValue == formattedValue) {
                    return input.setSelectionRange(core.current.caret, core.current.caret);
                }
            }

            // Если текст выделялся в обратном порядке, ставим каретку в конец выделения.
            if (selectionDirection == 'backward') {
                return input.setSelectionRange(selectionEnd, selectionEnd);
            }

            // В остальных случаях ставим каретку в начало выделения.
            return input.setSelectionRange(selectionStart, selectionStart);
        };

        /** Обработчик нажатия клавиши. */
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            core.current.cache.key = event.key;
            onKeyDown?.(event);
        };

        /** Обработчик выбора текста. */
        const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
            core.current.cache.key = '';
            core.current.cache.selectionStart = event.currentTarget.selectionStart;
            core.current.cache.selectionEnd = event.currentTarget.selectionEnd;
            core.current.cache.selectionDirection = event.currentTarget.selectionDirection;
            onSelect?.(event);
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
                placeholder={placeholder || defaultPlaceholder}
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onSelect={handleSelect}
                {...rest}
                ref={setRef}
            />
        );
    }
);

AmountBaseInput.displayName = 'AmountBaseInput';
