import React, {useContext} from 'react';
import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {DatePickerExtendedContext} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtendedContext';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента DatePickerTargetButton. */
export interface IDatePickerTargetButtonProps extends IButtonIconProps {}

/** Кнопка компонента DatePickerTarget. */
export const DatePickerTargetButton = React.forwardRef<HTMLButtonElement, IDatePickerTargetButtonProps>((props, ref) => {
    const {className, onClick, ...rest} = props;
    const {dropdownOpen, setDropdownOpen} = useContext(DatePickerExtendedContext);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropdownOpen(!dropdownOpen);
        onClick?.(event);
    };

    return (
        <ButtonIcon
            className={classnames('cssClass[datePickerTargetButton]', className)}
            active={dropdownOpen}
            onClick={handleClick}
            {...rest}
            ref={ref}
        >
            <CalendarSrvIcon20 />
        </ButtonIcon>
    );
});

DatePickerTargetButton.displayName = 'DatePickerTargetButton';
