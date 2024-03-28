import React from 'react';
import {TopOverlayContentSubTitle} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayContentSubTitle';
import {TopOverlayContentTitle} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayContentTitle';

/** Свойства компонента TopOverlayContent. */
interface ITopOverlayContentProps {
    children?: React.ReactNode;
}

/** Контент верхнего предупреждения. */
export class TopOverlayContent extends React.Component<ITopOverlayContentProps> {
    public static displayName = 'TopOverlayContent';
    public static Title = TopOverlayContentTitle;
    public static SubTitle = TopOverlayContentSubTitle;

    public render() {
        const {children} = this.props;
        return <div className="cssClass[globalTopOverlayContent]">{children}</div>;
    }
}
