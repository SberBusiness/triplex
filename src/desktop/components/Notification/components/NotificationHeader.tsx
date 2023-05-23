import * as React from 'react';

/**
 * Опции хэдера нотификации.
 *
 * @prop {React.ReactNode} children Дочерний элемент хэдера нотификации.
 */
export interface INotificationHeaderProps {
    children: React.ReactNode;
}

/**
 * Хэдер нотификации.
 */
export const NotificationHeader: React.FC<INotificationHeaderProps> = ({children}) => (
    <h3 className="cssClass[notificationHeader]">{children}</h3>
);

NotificationHeader.displayName = 'NotificationHeader';
