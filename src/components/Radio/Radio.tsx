import React, {useState, useRef} from 'react';
import {IRadioProps} from '@sberbusiness/triplex/components/Radio/types';
import {EFocusSource} from '@sberbusiness/triplex/enums/EFocusSource';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Радио-кнопка с описанием. */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const {children, className, onFocus, onBlur, disabled, labelAttributes, ...inputAttributes} = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = classnames('cssClass[radio]', className);
    const labelClassNames = classnames(
        'cssClass[label]',
        {'cssClass[disabled]': !!disabled, 'cssClass[nonempty]': !!children},
        labelAttributes?.className
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (event.target === inputRef.current) {
                // Сбрасываем состояние, если событие пришло от радио-кнопки не в фокусе. (Safari)
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

    return (
        <label
            {...labelAttributes}
            className={labelClassNames}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            data-tx={process.env.npm_package_version}
        >
            <input
                type="radio"
                className={classNames}
                disabled={disabled}
                data-focus-visible={focusVisible ? '' : undefined}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...inputAttributes}
                ref={setRef}
            />
            <span className="cssClass[radioIcon]" />
            {children}
        </label>
    );
});

Radio.displayName = 'Radio';
