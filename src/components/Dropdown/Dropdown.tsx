import React from 'react';
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
    /** Свойства отображения в адаптивном режиме. В этом режиме на мобильном устройстве Dropdown рендерится на весь экран. */
    mobileViewProps?: Omit<IDropdownMobileProps, 'opened' | 'setOpened'>;
}

/** Выпадающее меню. */
export const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(
    ({children, mobileViewProps, opened, setOpened, ...desktopProps}, ref) => (
        <Portal container={document.body}>
            {mobileViewProps ? (
                <MobileView
                    fallback={
                        <DropdownDesktop opened={opened} setOpened={setOpened} ref={ref} {...desktopProps}>
                            {children}
                        </DropdownDesktop>
                    }
                >
                    <DropdownMobile ref={ref} opened={opened} setOpened={setOpened} {...mobileViewProps}>
                        {mobileViewProps?.children || children}
                    </DropdownMobile>
                </MobileView>
            ) : (
                <DropdownDesktop opened={opened} setOpened={setOpened} ref={ref} {...desktopProps}>
                    {children}
                </DropdownDesktop>
            )}
        </Portal>
    )
);

Dropdown.displayName = 'Dropdown';
