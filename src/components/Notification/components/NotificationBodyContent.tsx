import React from 'react';

/** Свойства компонента NotificationBodyContent. */
interface INotificationBodyContentProps {
    children?: React.ReactNode;
}

/** Основное сообщение нотификации. */
export const NotificationBodyContent: React.FC<INotificationBodyContentProps> = ({children}) => (
    <div className="cssClass[notificationBodyContent]">{children}</div>
);

NotificationBodyContent.displayName = 'NotificationBodyContent';
