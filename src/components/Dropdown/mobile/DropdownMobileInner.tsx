import React, {useEffect, useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {IOverlayChildrenProvideProps} from '@sberbusiness/triplex/components/Overlay/OverlayBase';

export interface IDropdownMobileInnerProps extends IOverlayChildrenProvideProps, React.HTMLAttributes<HTMLDivElement> {}

/** Контент мобильного Dropdown. */
export const DropdownMobileInner = React.forwardRef<HTMLDivElement, IDropdownMobileInnerProps>(
    (
        {children, className, opened: openedProps, opening: openingProps, closing, setOpened, setClosing, setOpening, ...htmlAttributes},
        ref
    ) => {
        // OpeningState после рендера становится равен openingProps. Чтобы появилась анимация открытия, сначала нужно отрендерить элемент в закрытом виде.
        const [openingState, setOpeningState] = useState(false);
        const [openedState, setOpenedState] = useState(false);

        useEffect(() => {
            setTimeout(() => setOpeningState(openingProps));
        }, [openingProps]);

        useEffect(() => {
            setTimeout(() => setOpenedState(openedProps));
        }, [openedProps]);

        const classNamesWrapper = classnames('cssClass[dropdownMobileWrapper]', className);

        const classNamesBackDrop = classnames('cssClass[dropdownMobileBackdrop]', {
            'cssClass[closing]': closing,
            'cssClass[opening]': openingState,
            'cssClass[opened]': openedState,
        });

        const classNamesContent = classnames('cssClass[dropdownMobile]', {
            'cssClass[closing]': closing,
            'cssClass[opening]': openingState,
            'cssClass[opened]': openedState,
        });

        const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
            const {target, currentTarget} = event;

            if (target === currentTarget) {
                if (closing) {
                    setClosing(false);
                } else if (openingProps) {
                    setOpening(false);
                }
            }
        };

        const handleTouchStart = () => {
            // Закрытие popup по клику на Backdrop.
            setOpened(false);
        };

        if (!openingProps && !openedProps && !closing) {
            return null;
        }

        return (
            <div className={classNamesWrapper}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div className={classNamesBackDrop} onTransitionEnd={handleTransitionEnd} onTouchStart={handleTouchStart} />
                <div className={classNamesContent} ref={ref} {...htmlAttributes}>
                    {children}
                </div>
            </div>
        );
    }
);

DropdownMobileInner.displayName = 'DropdownMobileInner';
