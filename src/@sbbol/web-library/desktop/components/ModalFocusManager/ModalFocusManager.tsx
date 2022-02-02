import React, {useEffect} from 'react';
import {isKey} from '@sbbol/web-library/desktop/utils/keyboard';
import {staticPositionFocus, findFirstInteractiveElement} from '@sbbol/web-library/desktop/components/ModalFocusManager/utils';
import {ModalFocusManagerContext} from './ModalFocusManagerContext';
import {useContext} from 'react';
import closest from 'element-closest';

interface IModalFocusManagerProps {
    // FocusManager не активен.
    disabled?: boolean;
}

/** Компонент контроля фокуса внутри заданного элемента. */
export const ModalFocusManager: React.FC<IModalFocusManagerProps> = ({children, disabled}) => {
    const {parentFocusManagerEnabled} = useContext(ModalFocusManagerContext);
    const refRootEl = React.useRef<HTMLDivElement | null>(null);
    const refLastEl = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Polyfill для IE.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        closest(window);
    }, []);

    useEffect(() => {
        const {current: rootEl} = refRootEl;
        const {current: lastEl} = refLastEl;

        if (!rootEl || !lastEl) {
            return;
        }

        const focusAfterClosed = document.activeElement as HTMLElement;
        const firstInteractiveElement = findFirstInteractiveElement(rootEl);

        const handleKeyup = (event: KeyboardEvent): void => {
            const key = event.code || event.keyCode;

            const contains = rootEl.contains(document.activeElement);

            // Флаг, показывающий, что фокус попал во вложенный FocusManager. Два активных FocusManager быть не может, фокус возвращается в первый элемент верхнего FocusManager.
            const parentFocusManagerEnabledAttr = document.activeElement?.closest('[data-parent-focus-manager-enabled=true]');

            if ((isKey(key, 'TAB') && !contains) || document.activeElement === lastEl || parentFocusManagerEnabledAttr) {
                firstInteractiveElement?.focus();
            }
        };

        if (firstInteractiveElement && !disabled) {
            firstInteractiveElement?.focus();
            document.addEventListener('keyup', handleKeyup);
        }

        if (disabled) {
            document.removeEventListener('keyup', handleKeyup);
        }

        return () => {
            if (firstInteractiveElement) {
                document.removeEventListener('keyup', handleKeyup);
            }
            if (focusAfterClosed) {
                staticPositionFocus(focusAfterClosed);
            }
        };
    }, [disabled, parentFocusManagerEnabled]);

    return (
        <ModalFocusManagerContext.Provider value={{parentFocusManagerEnabled: !disabled}}>
            <div ref={refRootEl} data-parent-focus-manager-enabled={parentFocusManagerEnabled}>
                {children}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div ref={refLastEl} tabIndex={0} />
            </div>
        </ModalFocusManagerContext.Provider>
    );
};
