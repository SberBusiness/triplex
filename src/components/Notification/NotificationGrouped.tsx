import {NotificationGroupedFooter} from '@sberbusiness/triplex/components/Notification/components/NotificationGroupedFooter';
import React from 'react';
/**
 * Свойства NotificationGrouped.
 */
export interface INotificationGroupedProps {
    children: React.ReactNode;
}

/**
 * Компонент NotificationGrouped.
 * @prop {React.ReactNode} children Нотификация.
 */
export const NotificationGrouped: React.FC<INotificationGroupedProps> = ({children}) => (
    <div className="cssClass[notificationGroupedWrapper]">
        {children}
        <NotificationGroupedFooter />
    </div>
);

NotificationGrouped.displayName = 'NotificationGrouped';
