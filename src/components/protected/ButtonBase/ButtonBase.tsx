import React, {useState, useEffect, useRef} from 'react';
import {EFocusSource} from '@sberbusiness/triplex/enums/EFocusSource';

/** Свойства ButtonBase. */
interface IButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** База для кнопок. */
export const ButtonBase = React.forwardRef<HTMLButtonElement, IButtonBaseProps>((props, ref) => {
    const {children, disabled, onFocus, onBlur, onMouseDown, ...rest} = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        // При переходе кнопки в состояние disabled не срабатывает onBlur.
        if (disabled && focusVisible) {
            focusSource.current = EFocusSource.NONE;
            setFocusVisible(false);
        }
    }, [disabled]);

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (focusSource.current !== EFocusSource.MOUSE) {
            focusSource.current = EFocusSource.KEYBOARD;
            setFocusVisible(true);
        } else if (focusVisible) {
            setFocusVisible(false);
        }

        onFocus?.(event);
    };

    /** Обработчик потери фокуса. */
    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (focusSource.current !== EFocusSource.NONE) {
            // При переключении окон/вкладок состояние не сбрасываем.
            if (event.target !== document.activeElement) {
                focusSource.current = EFocusSource.NONE;
                setFocusVisible(false);
            }
        }

        onBlur?.(event);
    };

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
                requestAnimationFrame(() => {
                    // Сбрасываем состояние, если кнопка в итоге не получила фокус. (Safari)
                    if (buttonRef.current !== document.activeElement) {
                        focusSource.current = EFocusSource.NONE;
                    }
                });
            }
        }

        onMouseDown?.(event);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLButtonElement | null) => {
        buttonRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <button
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={handleMouseDown}
            data-focus-visible={focusVisible ? '' : undefined}
            ref={setRef}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
});

ButtonBase.displayName = 'ButtonBase';
