import React, {useState, useRef, useCallback, useEffect} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {Portal} from '@sberbusiness/triplex/desktop/components/Portal/Portal';
import {DropdownList} from './components/DropdownList';

/** Варианты направления Dropdown. */
export enum EDropdownDirection {
    AUTO = 'auto',
    BOTTOM = 'bottom',
    TOP = 'top',
}

/** Варианты выравнивания Dropdown. */
export enum EDropdownAlignment {
    AUTO = 'auto',
    LEFT = 'left',
    RIGHT = 'right',
}

/** Свойства компонента Dropdown. */
export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Ссылка на управляющий элемент. */
    targetRef: React.RefObject<HTMLElement>;
    /** Ссылка на контейнер Dropdown. */
    forwardedRef?: React.RefObject<HTMLDivElement>;
    /** Направление выпадающего меню. */
    direction?: EDropdownDirection;
    /** Выравнивание списка относительно управляющего элемента. */
    alignment?: EDropdownAlignment;
    /** Фиксированная ширина по управляющему элементу. */
    fixedWidth?: boolean;
}

export interface IDropdownFC extends React.FC<IDropdownProps> {
    List: typeof DropdownList;
}

/** Выпадающее меню. */
export const Dropdown: IDropdownFC = ({
    children,
    className,
    style,
    opened,
    alignment = EDropdownAlignment.AUTO,
    direction = EDropdownDirection.AUTO,
    fixedWidth,
    forwardedRef,
    targetRef,
    ...rest
}) => {
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
        if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<typeof instance>).current = instance;
        }
    };

    if (!opened) {
        return null;
    }

    return (
        <Portal container={document.body}>
            <div className={classNames} style={{...styles}} ref={setRef} {...rest}>
                {children}
            </div>
        </Portal>
    );
};

Dropdown.List = DropdownList;
Dropdown.displayName = 'Dropdown';
