import {ClosetooltipSrvxIcon16} from '@sberbusiness/icons/ClosetooltipSrvxIcon16';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import * as React from 'react';

/**
 * @prop {Function} onClick Обработчик закрытия тултипа.
 */
interface ITooltipXButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

/**
 * Кнопка закрытия на тултипа.
 */
export class TooltipXButton extends React.Component<ITooltipXButtonProps> {
    public static displayName = 'TooltipXButton';

    public render() {
        const {onClick, ...htmlAttrs} = this.props;
        return (
            <div className="cssClass[tooltipXButton]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESC}>
                    <ButtonIcon {...htmlAttrs} onClick={onClick}>
                        <ClosetooltipSrvxIcon16 />
                    </ButtonIcon>
                </TriggerClickOnKeyDownEvent>
            </div>
        );
    }
}
