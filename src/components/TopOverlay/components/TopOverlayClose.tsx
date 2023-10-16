import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import React from 'react';

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
            <div className="cssClass[globalTopOverlayClose]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                    <ButtonIcon onClick={onClick} data-test-id="close-cross" title="Закрыть">
                        <ClosemediumNavIcon20 />
                    </ButtonIcon>
                </TriggerClickOnKeyDownEvent>
            </div>
        );
    }
}
