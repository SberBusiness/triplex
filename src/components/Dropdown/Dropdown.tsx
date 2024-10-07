import React, {useEffect, useRef} from 'react';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import {DropdownDesktop, IDropdownDesktopProps} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownDesktop';
import {DropdownMobile, IDropdownMobileProps} from './mobile/DropdownMobile';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';

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
export interface IDropdownProps extends IDropdownDesktopProps {
    /** Функция, вызывающаяся при открытии. */
    onOpen?: () => void;
    /** Функция, вызывающаяся при закрытии. */
    onClose?: () => void;
    /** Свойства отображения в адаптивном режиме. В этом режиме на мобильном устройстве Dropdown рендерится на весь экран. */
    mobileViewProps?: Omit<IDropdownMobileProps, 'opened' | 'setOpened'>;
}

/** Выпадающее меню. */
export const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(
    ({children, opened, setOpened, onOpen, onClose, mobileViewProps, ...desktopProps}, ref) => {
        const mountedRef = useRef(false);

        useEffect(() => {
            if (!mountedRef.current) {
                mountedRef.current = true;
            } else if (opened) {
                onOpen?.();
            } else {
                onClose?.();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [opened]);

        return (
            <Portal container={document.body}>
                {mobileViewProps ? (
                    <MobileView
                        fallback={
                            <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                                {children}
                            </DropdownDesktop>
                        }
                    >
                        <DropdownMobile opened={opened} setOpened={setOpened} {...mobileViewProps} ref={ref}>
                            {mobileViewProps?.children || children}
                        </DropdownMobile>
                    </MobileView>
                ) : (
                    <DropdownDesktop opened={opened} setOpened={setOpened} {...desktopProps} ref={ref}>
                        {children}
                    </DropdownDesktop>
                )}
            </Portal>
        );
    }
);

Dropdown.displayName = 'Dropdown';
