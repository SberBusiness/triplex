import React, {useContext} from 'react';
import {Input, IInputProps} from '@sberbusiness/triplex/components/Input/Input';
import {defaultMonthYearPlaceholder} from '@sberbusiness/triplex/components/MonthYearPicker/const';
import {DatePickerExtendedContext} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtendedContext';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента MonthYearPickerTargetInput. */
export interface IMonthYearPickerTargetInputProps extends IInputProps {}

/** Поле ввода компонента MonthYearPickerTarget. */
export const MonthYearPickerTargetInput = React.forwardRef<HTMLInputElement, IMonthYearPickerTargetInputProps>((props, ref) => {
    const {placeholder = defaultMonthYearPlaceholder, onFocus, onKeyDown, ...rest} = props;
    const {dropdownOpen, mouseUsedRef, setDropdownOpen} = useContext(DatePickerExtendedContext);

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (mouseUsedRef.current) {
            !dropdownOpen && setDropdownOpen(true);
        }
        onFocus?.(event);
    };

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            event.preventDefault();
            setDropdownOpen(!dropdownOpen);
        }

        onKeyDown?.(event);
    };

    return (
        <Input
            placeholder={placeholder}
            role="button"
            readOnly={true}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            {...rest}
            ref={ref}
        />
    );
});

MonthYearPickerTargetInput.displayName = 'MonthYearTargetInput';
