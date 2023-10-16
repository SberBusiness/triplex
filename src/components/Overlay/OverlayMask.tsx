import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {IOverlayChildrenProvideProps} from '@sberbusiness/triplex/components/Overlay/OverlayBase';

interface IOverlayMaskProps extends Pick<IOverlayChildrenProvideProps, 'opened'>, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Область с полупрозрачным фоном между контейнером оверлея и OverlayPanel.
 */
export const OverlayMask = React.forwardRef<HTMLDivElement, IOverlayMaskProps>(({className, opened, ...htmlDivAttributes}, ref) => (
    <div
        className={classnames('cssClass[overlayMask]', className, {
            'cssClass[overlayOpened]': opened,
        })}
        ref={ref}
        {...htmlDivAttributes}
    />
));

OverlayMask.displayName = 'OverlayMask';
