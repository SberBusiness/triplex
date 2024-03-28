import React from 'react';
import {TopOverlayControlsCloseButton} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayControlsCloseButton';
import {TopOverlayControlsContinueButton} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayControlsContinueButton';

/** Свойства компонента TopOverlayControls. */
interface ITopOverlayControlsProps {
    children?: React.ReactNode;
}

/** Компонент с кнопками действий. */
export class TopOverlayControls extends React.Component<ITopOverlayControlsProps> {
    public static displayName = 'TopOverlayControls';
    public static ContinueButton = TopOverlayControlsContinueButton;
    public static CloseButton = TopOverlayControlsCloseButton;

    public render() {
        const {children} = this.props;
        return <div className="cssClass[topOverlayControls]">{children}</div>;
    }
}
