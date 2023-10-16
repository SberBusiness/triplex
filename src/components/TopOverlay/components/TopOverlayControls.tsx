import {TopOverlayControlsCloseButton} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayControlsCloseButton';
import {TopOverlayControlsContinueButton} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayControlsContinueButton';
import React from 'react';

/**
 * Компонент с кнопками действий.
 */
export class TopOverlayControls extends React.Component {
    public static displayName = 'TopOverlayControls';
    public static ContinueButton = TopOverlayControlsContinueButton;
    public static CloseButton = TopOverlayControlsCloseButton;

    public render() {
        const {children} = this.props;
        return <div className="cssClass[topOverlayControls]">{children}</div>;
    }
}
