import React, {useEffect, useRef, useState} from 'react';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {EFocusSource} from '@sbbol/web-library/common/enums/EFocusSource';
import {isKey} from '@sbbol/web-library/desktop/utils/keyboard';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {mapButtonSizeToCssClass, mapButtonThemeToCssClass} from '@sbbol/web-library/desktop/components/Button/utils';
import {DotsIcon} from '@sbbol/web-library/desktop/common/icons';
import {SpinnersmallwhiteAniIcon20} from '@sberbusiness/icons/SpinnersmallwhiteAniIcon20';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';

/** Свойства кнопки. */
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка загрузки. */
    spinnerIcon?: React.ReactElement;
}

interface IButtonBaseProps {
    theme: EButtonTheme.GENERAL | EButtonTheme.SECONDARY;
}

interface IButtonDangerProps {
    theme: EButtonTheme.DANGER;
    size: EButtonSize.MD;
}

interface IButtonDotsProps {
    theme: EButtonTheme.DOTS;
    block?: never;
    loading?: never;
    spinnerIcon?: never;
}

interface IButtonLinkProps {
    theme: EButtonTheme.LINK;
    block?: never;
    loading?: never;
    spinnerIcon?: never;
    disabled?: never;
}

export type TButtonProps = IButtonProps & (IButtonBaseProps | IButtonDangerProps | IButtonDotsProps | IButtonLinkProps);

/** Компонент "Кнопка". */
export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
    ({children, className, onMouseDown, onFocus, theme, size, block, loading, spinnerIcon, ...rest}, ref) => {
        const [focus, setFocus] = useState(EFocusSource.NONE);
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        useEffect(() => {
            if (focus !== EFocusSource.NONE) {
                document.addEventListener('mousedown', listenMouseDown);
                document.addEventListener('keydown', listenKeyDown);
                return () => {
                    document.removeEventListener('mousedown', listenMouseDown);
                    document.removeEventListener('keydown', listenKeyDown);
                };
            }
        }, [focus]);

        const setRef = (instance: HTMLButtonElement | null) => {
            buttonRef.current = instance;
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLButtonElement | null>).current = instance;
            }
        };

        const listenMouseDown = (event: MouseEvent) => {
            if (!buttonRef.current?.contains(event.target as Node)) {
                setFocus(EFocusSource.NONE);
            }
        };

        const listenKeyDown = (event: KeyboardEvent) => {
            const key = event.code || event.keyCode;

            if (isKey(key, 'TAB')) {
                setFocus(EFocusSource.NONE);
            }
        };

        const renderLoadingIcon = () => {
            switch (theme) {
                case EButtonTheme.GENERAL:
                    return <SpinnersmallwhiteAniIcon20 className="cssClass[spinnerIcon]" />;
                case EButtonTheme.SECONDARY:
                    return <SpinnersmallAniIcon20 className="cssClass[spinnerIcon]" />;
                case EButtonTheme.DANGER:
                    return <SpinnersmallwhiteAniIcon20 className="cssClass[spinnerIcon]" />;
            }
        };

        const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (focus === EFocusSource.NONE && buttonRef.current !== document.activeElement) {
                setFocus(EFocusSource.MOUSE);
            }
            onMouseDown?.(event);
        };

        const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
            if (focus === EFocusSource.NONE) {
                setFocus(EFocusSource.KEYBOARD);
            }
            onFocus?.(event);
        };

        return (
            <button
                type="button"
                className={classnames(
                    'cssClass[button]',
                    mapButtonThemeToCssClass[theme],
                    mapButtonSizeToCssClass[size],
                    {'cssClass[block]': !!block, 'cssClass[loading]': !!loading, 'cssClass[focusVisible]': focus === EFocusSource.KEYBOARD},
                    className
                )}
                onMouseDown={handleMouseDown}
                onFocus={handleFocus}
                {...rest}
                ref={setRef}
            >
                <span className="cssClass[buttonContent]">
                    {theme === EButtonTheme.DOTS ? <DotsIcon className="cssClass[dotsIcon]" /> : children}
                </span>
                {loading && <span className="cssClass[buttonSpinner]">{spinnerIcon || renderLoadingIcon()}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
