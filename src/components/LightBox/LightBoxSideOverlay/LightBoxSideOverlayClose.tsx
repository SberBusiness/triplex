import React from 'react';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {ILightBoxSideOverlayCloseButtonProps, LightBoxSideOverlayCloseButton} from './LightBoxSideOverlayCloseButton';

export interface ILightBoxSideOverlayCloseProps extends ILightBoxSideOverlayCloseButtonProps {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

/**
 * Компонент закрытия SideOverlay.
 */
export const LightBoxSideOverlayClose: React.FC<ILightBoxSideOverlayCloseProps> = ({clickByEsc, ...buttonProps}) => {
    if (clickByEsc) {
        return (
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <LightBoxSideOverlayCloseButton {...buttonProps} />
            </TriggerClickOnKeyDownEvent>
        );
    }
    return <LightBoxSideOverlayCloseButton {...buttonProps} />;
};
