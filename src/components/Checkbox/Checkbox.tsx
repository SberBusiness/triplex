import React, {useState, useRef} from 'react';
import {CheckboxbulkStsIcon16} from '@sberbusiness/icons/CheckboxbulkStsIcon16';
import {CheckboxtickStsIcon16} from '@sberbusiness/icons/CheckboxtickStsIcon16';
import {ICheckboxProps} from '@sberbusiness/triplex/components/Checkbox/types';
import {EFocusSource} from '@sberbusiness/triplex/enums/EFocusSource';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Чекбокс с описанием. */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const {children, className, onFocus, onBlur, disabled, bulk, labelAttributes, ...inputAttributes} = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = classnames('cssClass[checkbox]', className);
    const classNamesLabel = classnames(
        'cssClass[label]',
        {'cssClass[disabled]': !!disabled, 'cssClass[nonempty]': !!children},
        labelAttributes?.className
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onMouseDown?.(event);
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
        <label
            {...labelAttributes}
            className={classNamesLabel}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            data-tx={process.env.npm_package_version}
        >
            <input
                type="checkbox"
                className={classNames}
                disabled={disabled}
                data-focus-visible={focusVisible ? '' : undefined}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...inputAttributes}
                ref={setRef}
            />
            <span className="cssClass[checkboxIcon]" />
            {renderCheckmarkIcon()}
            {children}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
