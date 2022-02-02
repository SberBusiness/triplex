import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import * as React from 'react';

/**
 * Свойства компонента.
 * @prop {Function} onClick Обработчик клика на компонент.
 */
export interface ITopOverlayCloseProps {
    onClick: () => void;
}

/**
 * Компонент закрытия верхнего предупреждения.
 */
export class TopOverlayClose extends React.PureComponent<ITopOverlayCloseProps> {
    public static displayName = 'TopOverlayClose';

    public render() {
        const {onClick} = this.props;

        return (
            <div className="cssClass[topOverlayClose]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESC}>
                    <ButtonIcon onClick={onClick} data-test-id="close-cross">
                        <ClosemediumNavIcon20 />
                    </ButtonIcon>
                </TriggerClickOnKeyDownEvent>
            </div>
        );
    }
}
