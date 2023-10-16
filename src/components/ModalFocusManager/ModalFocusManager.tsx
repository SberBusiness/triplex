import React, {useEffect} from 'react';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {staticPositionFocus, findFirstInteractiveElement} from '@sberbusiness/triplex/components/ModalFocusManager/utils';
import {ModalFocusManagerContext} from './ModalFocusManagerContext';
import {useContext} from 'react';
import closest from 'element-closest';

/**
 * Свойства, передаваемые в render-функцию children.
 */
export interface IModalFocusManagerChildrenProps {
    /**
     * Элемент, должен быть расположен в самом низу разметки модального окна.
     * При получении фокуса на этот элемент, фокус будет переходить на первый, доступный для фокуса, элемент модального окна.
     */
    lastInteractiveElement: React.ReactElement;
}

interface IModalFocusManagerProps {
    children: React.ReactNode | ((props: IModalFocusManagerChildrenProps) => React.ReactNode);
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
                firstInteractiveElement?.focus({preventScroll: true});
            }
        };

        const handleFocus = (event: FocusEvent): void => {
            if (
                event.target === document ||
                event.target === rootEl ||
                (event.target instanceof HTMLElement && rootEl.contains(event.target))
            ) {
                return;
            }

            firstInteractiveElement?.focus({preventScroll: true});
        };

        if (firstInteractiveElement && !disabled) {
            firstInteractiveElement?.focus({preventScroll: true});
            document.addEventListener('keyup', handleKeyup);
            document.addEventListener('focusin', handleFocus);
        }

        if (disabled) {
            document.removeEventListener('keyup', handleKeyup);
            document.removeEventListener('focusin', handleFocus);
        }

        return () => {
            if (firstInteractiveElement) {
                document.removeEventListener('keyup', handleKeyup);
                document.removeEventListener('focusin', handleFocus);
            }
            if (focusAfterClosed) {
                staticPositionFocus(focusAfterClosed);
            }
        };
    }, [disabled, parentFocusManagerEnabled]);

    return (
        <ModalFocusManagerContext.Provider value={{parentFocusManagerEnabled: !disabled}}>
            <div ref={refRootEl} data-parent-focus-manager-enabled={parentFocusManagerEnabled}>
                {typeof children === 'function' ? (
                    children({
                        lastInteractiveElement: (
                            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
                            /* eslint-disable jsx-a11y/no-static-element-interactions */
                            /* При получении фокуса на этот элемент, фокус будет переходить на первый, доступный для фокуса, элемент модального окна. */
                            <div ref={refLastEl} tabIndex={0} />
                        ),
                    })
                ) : (
                    <>
                        {children}

                        {/* При получении фокуса на этот элемент, фокус будет переходить на первый, доступный для фокуса, элемент модального окна. */}
                        <div ref={refLastEl} tabIndex={0} />
                    </>
                )}
            </div>
        </ModalFocusManagerContext.Provider>
    );
};
