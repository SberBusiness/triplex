import React, {useRef} from 'react';
import {AmountBaseInput} from '../protected/AmountBaseInput/AmountBaseInput';
import {IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента AmountInput. */
export interface IAmountInputProps extends Omit<IInputProps, 'type' | 'onChange'>, TestProps {
    value: string;
    onChange: (value: string) => void;
    /** Количество знаков после запятой. */
    fractionLength?: number;
    /** Валюта. */
    currency?: string;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
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
            <Text
                className="cssClass[currency]"
                data-test-id={dataTestId ? `${dataTestId}__unit` : undefined}
                size={ETextSize.B1}
                type={EFontType.SECONDARY}
                onClick={() => inputRef.current?.focus()}
            >
                {currency}
            </Text>
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
                        'cssClass[filled]': !!value,
                        'cssClass[withCurrency]': !!currency,
                        'cssClass[disabled]': !!disabled,
                        'cssClass[error]': !!error,
                        'cssClass[grouped]': !!groupPosition,
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
