import React, {useState, useRef, useCallback, useEffect} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EDropdownAlignment, EDropdownDirection} from '../Dropdown';

export interface IDropdownDesktopProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
    /** Ссылка на управляющий элемент. */
    targetRef: React.RefObject<HTMLElement>;
    /** Направление выпадающего меню. */
    direction?: EDropdownDirection;
    /** Выравнивание списка относительно управляющего элемента. */
    alignment?: EDropdownAlignment;
    /** Фиксированная ширина по управляющему элементу. */
    fixedWidth?: boolean;
}

/** Выпадающее меню. */
export const DropdownDesktop = React.forwardRef<HTMLDivElement, IDropdownDesktopProps>((props, ref) => {
    const {
        alignment = EDropdownAlignment.AUTO,
        children,
        fixedWidth,
        className,
        direction = EDropdownDirection.AUTO,
        opened,
        setOpened,
        style,
        targetRef,
        ...rest
    } = props;
    const [styles, setStyles] = useState<React.CSSProperties>({...style, visibility: 'hidden'});
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const classNames = classnames('cssClass[dropdown]', className);

    /** Расчёт положения по горизонтали. */
    const calculatePositionHorizontal = useCallback(
        (css: React.CSSProperties, dropdownRect: DOMRect, targetRect: DOMRect) => {
            const width = fixedWidth ? targetRect.width : Math.max(targetRect.width, dropdownRect.width);

            if (alignment === EDropdownAlignment.AUTO) {
                if (targetRect.right - width > 0) {
                    // Если влезает слева.
                    css.left = targetRect.right - width;
                } else if (targetRect.left + width < document.documentElement.clientWidth) {
                    // Если влезает справа.
                    css.left = targetRect.left;
                } else {
                    // Если не влезает слева и справа.
                    css.left = targetRect.right - width;
                }
            } else if (alignment === EDropdownAlignment.RIGHT) {
                css.left = targetRect.right - width;
            } else if (alignment === EDropdownAlignment.LEFT) {
                css.left = targetRect.left;
            }
        },
        [alignment, fixedWidth]
    );

    /** Расчёт положения по вертикали. */
    const calculatePositionVertical = useCallback(
        (css: React.CSSProperties, dropdownRect: DOMRect, targetRect: DOMRect) => {
            const offset = 4;

            if (direction === EDropdownDirection.AUTO) {
                if (targetRect.bottom + offset + dropdownRect.height < document.documentElement.clientHeight) {
                    // Если влезает снизу.
                    css.top = targetRect.bottom + offset;
                } else if (targetRect.top - offset - dropdownRect.height > 0) {
                    // Если не влезает снизу, но влезает сверху.
                    css.bottom = document.documentElement.clientHeight - targetRect.top + offset;
                } else {
                    // Если не влезает снизу и сверху.
                    css.top = targetRect.bottom + offset;
                }
            } else if (direction === EDropdownDirection.BOTTOM) {
                css.top = targetRect.bottom + offset;
            } else if (direction === EDropdownDirection.TOP) {
                css.bottom = document.documentElement.clientHeight - targetRect.top + offset;
            }
        },
        [direction]
    );

    /** Установка положения меню. */
    const setPosition = useCallback(() => {
        const {current: dropdown} = dropdownRef;
        const {current: target} = targetRef;

        if (dropdown && target) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const css: React.CSSProperties = {};

            if (fixedWidth) {
                css.width = targetRect.width;
            } else {
                css.minWidth = targetRect.width;
            }

            calculatePositionVertical(css, dropdownRect, targetRect);
            calculatePositionHorizontal(css, dropdownRect, targetRect);

            setStyles({...style, ...css});
        }
    }, [targetRef, fixedWidth, style, calculatePositionVertical, calculatePositionHorizontal]);

    useEffect(() => {
        if (opened) {
            setPosition();
        } else {
            setStyles({...style, visibility: 'hidden'});
        }
    }, [opened, setPosition, style]);

    /** Обработчик изменения положения меню. */
    const handleReposition = useCallback(() => {
        setTimeout(setPosition);
    }, [setPosition]);

    useEffect(() => {
        if (opened) {
            document.addEventListener('scroll', handleReposition, true);
            window.addEventListener('resize', handleReposition);

            return () => {
                document.removeEventListener('scroll', handleReposition, true);
                window.removeEventListener('resize', handleReposition);
            };
        }
    }, [opened, handleReposition]);

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        dropdownRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    if (!opened) {
        return null;
    }

    return (
        <div className={classNames} style={{...styles}} ref={setRef} {...rest}>
            {children}
        </div>
    );
});

DropdownDesktop.displayName = 'DropdownDesktop';
