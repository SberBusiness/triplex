import React, {useRef} from 'react';
import {AmountBaseInput} from '../protected/AmountBaseInput/AmountBaseInput';
import {IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента AmountInput. */
export interface IAmountInputProps extends Omit<IInputProps, 'type' | 'maxLength' | 'onChange'>, TestProps {
    /** Значение. */
    value: string;
    /** Максимальное количество знаков перед запятой. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. */
    fractionDigits?: number;
    /** Валюта. */
    currency?: string;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
    /** Обработчик изменения значения. */
    onChange: (value: string) => void;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/** Компонент ввода суммы. */
export const AmountInput = React.forwardRef<HTMLInputElement, IAmountInputProps>(
    ({className, 'data-test-id': dataTestId, currency, groupPosition, ...rest}, ref) => {
        const {value, disabled, error} = rest;
        const inputRef = useRef<HTMLInputElement | null>(null);

        const renderCurrency = () => (
            <span
                className="cssClass[currency]"
                data-test-id={dataTestId ? `${dataTestId}__unit` : undefined}
                onClick={() => inputRef.current?.focus()}
            >
                {currency}
            </span>
        );

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
            <div
                className={classnames(
                    'cssClass[amountInput]',
                    {
                        'cssClass[disabled]': !!disabled,
                        'cssClass[error]': !!error,
                        'cssClass[filled]': !!value,
                        'cssClass[grouped]': !!groupPosition,
                        'cssClass[withCurrency]': !!currency,
                    },
                    className
                )}
            >
                <AmountBaseInput
                    className={groupPosition && mapInputGroupPositionToCSSClass[groupPosition]}
                    data-test-id={dataTestId && `${dataTestId}__input`}
                    {...rest}
                    ref={setRef}
                />
                {currency && renderCurrency()}
            </div>
        );
    }
);

AmountInput.displayName = 'AmountInput';
