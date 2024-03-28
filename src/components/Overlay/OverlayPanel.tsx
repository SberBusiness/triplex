import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EOverlayDirection, IOverlayChildrenProvideProps} from './OverlayBase';

/** Свойства компонента OverlayPanel. */
interface IOverlayPanelProps extends React.HTMLAttributes<HTMLDivElement>, IOverlayChildrenProvideProps {}

/** Выезжающая с контентом панель оверлея. */
export const OverlayPanel = React.forwardRef<HTMLDivElement, IOverlayPanelProps>(
    (
        {
            children,
            className,
            closing,
            direction,
            onTransitionEnd,
            opened,
            opening,
            setClosing,
            setOpened,
            setOpening,
            ...htmlDivAttributes
        },
        ref
    ) => {
        const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
            const {target, currentTarget} = event;

            if (target === currentTarget) {
                setClosing(false);
                setOpening(false);
            }

            onTransitionEnd?.(event);
        };

        return (
            <div
                className={classnames('cssClass[overlayPanel]', className, {
                    'cssClass[bottom]': direction === EOverlayDirection.BOTTOM,
                    'cssClass[left]': direction === EOverlayDirection.LEFT,
                    'cssClass[opened]': opened,
                    'cssClass[right]': direction === EOverlayDirection.RIGHT,
                    'cssClass[top]': direction === EOverlayDirection.TOP,
                })}
                onTransitionEnd={handleTransitionEnd}
                ref={ref}
                {...htmlDivAttributes}
            >
                <div className="cssClass[overlayContent]">{children}</div>
            </div>
        );
    }
);

OverlayPanel.displayName = 'OverlayPanel';
