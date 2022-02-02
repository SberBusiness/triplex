import React, {useEffect, useRef, useState} from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ETextSize} from '@sbbol/web-library/desktop/components/Typography/enums';
import {Text} from '@sbbol/web-library/desktop/components/Typography/Text';
import {EFocusSource} from '@sbbol/web-library/common/enums/EFocusSource';
import {isKey} from '@sbbol/web-library/desktop/utils/keyboard';

export interface ITabsExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Выбранное состояние. */
    selected?: boolean;
    children: React.ReactNode;
}

/**
 * Кнопка таба.
 * Если используется кастомный компонент кнопки, желательно, чтобы он рендерил html-элемент button, иначе выбор с клавиатуры может работать не корректно.
 */
export const TabsExtendedTabButton = React.forwardRef<HTMLButtonElement, ITabsExtendedButtonProps>(
    ({children, className, onMouseDown, onFocus, selected, ...rest}, ref) => {
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
                    'cssClass[tabsExtendedTabButton]',
                    {'cssClass[focusVisible]': focus === EFocusSource.KEYBOARD, 'cssClass[selected]': !!selected},
                    className
                )}
                onMouseDown={handleMouseDown}
                onFocus={handleFocus}
                role="tab"
                aria-selected={selected}
                {...rest}
                ref={setRef}
            >
                <Text className="cssClass[tabsExtendedTabButtonInner]" size={ETextSize.B1}>
                    {children}
                </Text>
            </button>
        );
    }
);

TabsExtendedTabButton.displayName = 'TabsExtendedTabButton';
