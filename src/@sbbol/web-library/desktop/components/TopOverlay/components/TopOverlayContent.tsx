import {TopOverlayContentSubTitle} from '@sbbol/web-library/desktop/components/TopOverlay/components/TopOverlayContentSubTitle';
import {TopOverlayContentTitle} from '@sbbol/web-library/desktop/components/TopOverlay/components/TopOverlayContentTitle';
import * as React from 'react';

/**
 * Контент верхнего предупреждения.
 */
export class TopOverlayContent extends React.Component {
    public static displayName = 'TopOverlayContent';
    public static Title = TopOverlayContentTitle;
    public static SubTitle = TopOverlayContentSubTitle;

    public render() {
        const {children} = this.props;
        return <div className="cssClass[topOverlayContent]">{children}</div>;
    }
}
