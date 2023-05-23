import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EOverlayDirection, IOverlayPanelProvideProps} from './OverlayBase';

interface IOverlayPanelProps extends IOverlayPanelProvideProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Выезжающая с контентом панель оверлея.
 */
export const OverlayPanel: React.FC<IOverlayPanelProps> = ({
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
}) => {
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
                'cssClass[opened]': opened,
                'cssClass[bottom]': direction === EOverlayDirection.BOTTOM,
                'cssClass[left]': direction === EOverlayDirection.LEFT,
                'cssClass[right]': direction === EOverlayDirection.RIGHT,
                'cssClass[top]': direction === EOverlayDirection.TOP,
            })}
            onTransitionEnd={handleTransitionEnd}
            {...htmlDivAttributes}
        >
            <div className="cssClass[overlayContent]">{children}</div>
        </div>
    );
};
