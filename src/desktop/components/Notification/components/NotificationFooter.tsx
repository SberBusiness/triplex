import * as React from 'react';

/**
 * Опции футера нотификации.
 *
 * @prop {React.ReactNode} children Дочерний элемент футера нотификации.
 */
export interface INotificationFooterProps {
    children: React.ReactNode;
}

/**
 * Футер нотификации.
 */
export const NotificationFooter: React.FC<INotificationFooterProps> = ({children}) => (
    <div className="cssClass[notificationFooter]">{children}</div>
);

NotificationFooter.displayName = 'NotificationFooter';
