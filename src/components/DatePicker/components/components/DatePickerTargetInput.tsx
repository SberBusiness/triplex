import React, {useContext} from 'react';
import {MaskedInput, IMaskedInputProps} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import {DatePickerExtendedContext} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtendedContext';

/** Свойства компонента DatePickerTargetInput. */
export interface IDatePickerTargetInputProps extends Omit<IMaskedInputProps, 'mask'> {}

/** Поле ввода компонента DatePickerTarget. */
export const DatePickerTargetInput = React.forwardRef<HTMLInputElement, IDatePickerTargetInputProps>((props, ref) => {
    const {placeholderMask = MaskedInput.presets.placeholderMasks.date, onFocus, ...rest} = props;
    const {dropdownOpen, mouseUsedRef, setDropdownOpen} = useContext(DatePickerExtendedContext);

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (mouseUsedRef.current) {
            !dropdownOpen && setDropdownOpen(true);
        }
        onFocus?.(event);
    };

    return (
        <MaskedInput
            mask={MaskedInput.presets.masks.date}
            placeholderMask={placeholderMask}
            onFocus={handleFocus}
            {...rest}
            forwardedRef={ref}
        />
    );
});

DatePickerTargetInput.displayName = 'DatePickerTargetInput';
