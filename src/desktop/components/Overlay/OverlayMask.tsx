import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {IOverlayMaskProvideProps} from './OverlayBase';

interface IOverlayMaskProps extends IOverlayMaskProvideProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Область с полупрозрачным фоном между контейнером оверлея и OverlayPanel.
 */
export const OverlayMask: React.FC<IOverlayMaskProps> = ({className, opened, setOpened, ...htmlDivAttributes}) => {
    return (
        <div
            className={classnames('cssClass[overlayMask]', className, {
                'cssClass[overlayOpened]': opened,
            })}
            {...htmlDivAttributes}
        />
    );
};
