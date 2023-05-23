import {TopOverlayControlsCloseButton} from '@sberbusiness/triplex/desktop/components/TopOverlay/components/TopOverlayControlsCloseButton';
import {TopOverlayControlsContinueButton} from '@sberbusiness/triplex/desktop/components/TopOverlay/components/TopOverlayControlsContinueButton';
import * as React from 'react';

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
