import React, {useRef, useState} from 'react';
import {ICheckboxProps} from '@sberbusiness/triplex/components/Checkbox/types';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EFocusSource} from '@sberbusiness/triplex/enums/EFocusSource';
import {CheckboxbulkStsIcon16} from '@sberbusiness/icons/CheckboxbulkStsIcon16';
import {CheckboxtickStsIcon16} from '@sberbusiness/icons/CheckboxtickStsIcon16';

/** Чекбокс с описанием. */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const {children, className, onFocus, onBlur, disabled, bulk, labelAttributes, ...inputAttributes} = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = classnames('cssClass[checkbox]', className);
    const classNamesLabel = classnames(
        'cssClass[label]',
        {'cssClass[enabled]': !disabled, 'cssClass[nonempty]': !!children},
        labelAttributes?.className
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onMouseDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (event.target === inputRef.current) {
                // Сбрасываем состояние, если событие пришло от чекбокса не в фокусе. (Safari)
                if (event.target !== document.activeElement) {
                    focusSource.current = EFocusSource.NONE;
                }
            } else if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onClick?.(event);
    };

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.MOUSE) {
            focusSource.current = EFocusSource.KEYBOARD;
            setFocusVisible(true);
        } else if (focusVisible) {
            setFocusVisible(false);
        }
        onFocus?.(event);
    };

    /** Обработчик потери фокуса. */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.NONE) {
            // При переключении окон/вкладок состояние не сбрасываем.
            if (event.target !== document.activeElement) {
                focusSource.current = EFocusSource.NONE;
                setFocusVisible(false);
            }
        }
        onBlur?.(event);
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

    /** Отрисовка галочки чекбокса. */
    const renderCheckmarkIcon = () => {
        const className = 'cssClass[checkmarkIcon]';

        return bulk ? <CheckboxbulkStsIcon16 className={className} /> : <CheckboxtickStsIcon16 className={className} />;
    };

    return (
        <Text
            tag="label"
            size={ETextSize.B1}
            line={ELineType.EXTRA}
            htmlFor={inputAttributes.id}
            {...labelAttributes}
            className={classNamesLabel}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <input
                type="checkbox"
                className={classNames}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-focus-visible={focusVisible ? '' : undefined}
                ref={setRef}
                {...inputAttributes}
            />
            <span className="cssClass[checkboxIcon]" />
            {renderCheckmarkIcon()}
            {children}
        </Text>
    );
});

Checkbox.displayName = 'Checkbox';
