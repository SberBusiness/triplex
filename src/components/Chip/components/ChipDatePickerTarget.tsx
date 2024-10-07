import React, {useContext} from 'react';
import {Chip, IChipProps} from '@sberbusiness/triplex/components/Chip';
import {DatePickerExtendedContext} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtendedContext';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента ChipDatePickerTarget. */
export interface IChipDatePickerTargetProps extends IChipProps {}

/** Управляющий элемент компонента ChipDatePicker. */
export const ChipDatePickerTarget = React.forwardRef<HTMLSpanElement, IChipDatePickerTargetProps>((props, ref) => {
    const {children, onKeyDown, onClick, ...rest} = props;
    const {dropdownOpen, setDropdownOpen} = useContext(DatePickerExtendedContext);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            event.preventDefault();
            setDropdownOpen(!dropdownOpen);
        }

        onKeyDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        setDropdownOpen(!dropdownOpen);

        onClick?.(event);
    };

    return (
        <Chip aria-expanded={dropdownOpen} onKeyDown={handleKeyDown} onClick={handleClick} {...rest} ref={ref}>
            {children}
        </Chip>
    );
});

ChipDatePickerTarget.displayName = 'ChipDatePickerTarget';
