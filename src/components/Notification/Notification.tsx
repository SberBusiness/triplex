import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {NotificationBody} from '@sberbusiness/triplex/components/Notification/components/NotificationBody';
import {NotificationClose} from '@sberbusiness/triplex/components/Notification/components/NotificationClose';
import {NotificationIcon} from '@sberbusiness/triplex/components/Notification/components/NotificationIcon';
import {NotificationTime} from '@sberbusiness/triplex/components/Notification/components/NotificationTime';
import React from 'react';

/**
 * Свойства Notification.
 * @prop {React.ReactElement | React.ReactElement[]} children Тело нотификации.
 * @prop {boolean} [withExtraBottomPadding] Признак для увеличения отступа снизу, по дефолту есть в нотификации типа mail.
 * @prop {boolean} [isShowCloseOnHover] Признак является ли нотификация из sideoverlay или алертом, сделано для того чтобы в sideoverlay кнопка закрытия появлялась по ховеру.
 * @prop {Function} [onClick] Обработчик клика на нотификацию.
 */
export interface INotificationProps extends React.ButtonHTMLAttributes<HTMLElement> {
    children: React.ReactElement | React.ReactElement[];
    withExtraBottomPadding?: boolean;
    isShowCloseOnHover?: boolean;
    onClick?: () => void;
}

export interface INotificationSFC extends React.FC<INotificationProps> {
    Icon: typeof NotificationIcon;
    Body: typeof NotificationBody;
    Close: typeof NotificationClose;
    Time: typeof NotificationTime;
}

/**
 * Notification. Может содержать только Icon, Body, Close, Time.
 */
export const Notification: INotificationSFC = ((props) => {
    const {children, className, withExtraBottomPadding = false, isShowCloseOnHover = false, onClick, ...HTMLAttributes} = props;
    const cn = classnames(
        className,
        'cssClass[notification]',
        {'cssClass[extraBottomPadding]': withExtraBottomPadding},
        {'cssClass[showCloseOnHover]': isShowCloseOnHover}
    );

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div {...HTMLAttributes} role="alertdialog" className={cn} onClick={onClick}>
            {children}
        </div>
    );
}) as INotificationSFC;

Notification.displayName = 'Notification';
Notification.Icon = NotificationIcon;
Notification.Body = NotificationBody;
Notification.Close = NotificationClose;
Notification.Time = NotificationTime;
