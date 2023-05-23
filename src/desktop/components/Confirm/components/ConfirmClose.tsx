import * as React from 'react';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {ConfirmCloseButton, IConfirmCloseButtonProps} from './ConfirmCloseButton';

export interface IConfirmCloseProps extends IConfirmCloseButtonProps {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

/**
 * Компонент закрытия.
 */
export const ConfirmClose: React.FC<IConfirmCloseProps> = ({clickByEsc, ...buttonProps}) => {
    if (clickByEsc) {
        return (
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <ConfirmCloseButton {...buttonProps} />
            </TriggerClickOnKeyDownEvent>
        );
    }

    return <ConfirmCloseButton {...buttonProps} />;
};
