import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import React from 'react';

/**
 * Свойства компонента кнопки закрытия модального окна.
 *
 * @prop {never} [children] Дочерний элемент.
 * @prop {Function} onClick Обработчик закрытия.
 */
interface IModalWindowCloseProps extends Omit<IButtonIconProps, 'children'> {
    children?: never;
    onClick: () => void;
}

/**
 * Компонент кнопки закрытия модального окна.
 */
export class ModalWindowClose extends React.PureComponent<IModalWindowCloseProps> {
    public static displayName = 'ModalWindowClose';

    public static defaultProps = {
        title: 'Закрыть',
    };

    public render() {
        return (
            <div className="cssClass[modalWindowClose]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                    <ButtonIcon {...this.props}>
                        <ClosemediumNavIcon20 />
                    </ButtonIcon>
                </TriggerClickOnKeyDownEvent>
            </div>
        );
    }
}
