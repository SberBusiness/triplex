import {CloselargeNavIcon32} from '@sberbusiness/icons/CloselargeNavIcon32';
import {ButtonIcon, IButtonIconProps} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import * as React from 'react';

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

    public render() {
        return (
            <div className="cssClass[modalWindowClose]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESC}>
                    <ButtonIcon {...this.props}>
                        <CloselargeNavIcon32 />
                    </ButtonIcon>
                </TriggerClickOnKeyDownEvent>
            </div>
        );
    }
}
