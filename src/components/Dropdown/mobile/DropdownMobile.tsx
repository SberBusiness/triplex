import React, {useEffect} from 'react';
import {EOverlayDirection, IOverlayChildrenProvideProps, OverlayBase} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {DropdownMobileInner} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileInner';

export interface IDropdownMobileProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
}
const dropdownMobileBodyOverflowClassName = 'cssClass[dropdownMobileBodyOverflow]';

/** Мобильная версия Dropdown. */
export const DropdownMobile = React.forwardRef<HTMLDivElement, IDropdownMobileProps>(
    ({children, opened, setOpened, ...htmlAttributes}, ref) => {
        useEffect(() => {
            if (opened) {
                // Предотвращение скролла контента страницы.
                document.body.classList.add(dropdownMobileBodyOverflowClassName);
            } else {
                document.body.classList.remove(dropdownMobileBodyOverflowClassName);
            }

            return () => document.body.classList.remove(dropdownMobileBodyOverflowClassName);
        }, [opened]);

        return (
            <OverlayBase setOpened={setOpened} opened={opened} direction={EOverlayDirection.BOTTOM}>
                {(props: IOverlayChildrenProvideProps) => (
                    <DropdownMobileInner {...props} {...htmlAttributes} ref={ref}>
                        {children}
                    </DropdownMobileInner>
                )}
            </OverlayBase>
        );
    }
);

DropdownMobile.displayName = 'DropdownMobile';
