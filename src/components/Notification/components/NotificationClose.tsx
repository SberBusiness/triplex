import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import React from 'react';

/**
 * Свойства компонента кнопки закрытия нотификации.
 *
 * @prop {Function} onClick Обработчик закрытия нотификации.
 * @prop {never} [children] Дочерний элемент.
 */
export interface INotificationCloseProps extends Omit<IButtonIconProps, 'children'> {
    onClick: () => void;
    children?: never;
}

/**
 * Компонент кнопки закрытия нотификации.
 */
export const NotificationClose: React.FC<INotificationCloseProps> = ({onClick, ...buttonProps}) => (
    <span className="cssClass[notificationClose]">
        <ButtonIcon {...buttonProps} onClick={onClick}>
            <ClosenotificationSrvxIcon16 />
        </ButtonIcon>
    </span>
);

NotificationClose.displayName = 'NotificationClose';
