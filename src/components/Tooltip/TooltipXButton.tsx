import {ClosetooltipSrvxIcon16} from '@sberbusiness/icons/ClosetooltipSrvxIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import React from 'react';

/**
 * @prop {Function} onClick Обработчик закрытия тултипа.
 */
export interface ITooltipXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Кнопка закрытия на тултипа.
 */
export const TooltipXButton: React.FC<ITooltipXButtonProps> = (props) => (
    <div className="cssClass[tooltipXButton]">
        <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
            <ButtonIcon {...props}>
                <ClosetooltipSrvxIcon16 />
            </ButtonIcon>
        </TriggerClickOnKeyDownEvent>
    </div>
);

TooltipXButton.displayName = 'TooltipXButton';
