import * as React from 'react';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
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
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESC}>
                <LightBoxSideOverlayCloseButton {...buttonProps} />
            </TriggerClickOnKeyDownEvent>
        );
    }
    return <LightBoxSideOverlayCloseButton {...buttonProps} />;
};
