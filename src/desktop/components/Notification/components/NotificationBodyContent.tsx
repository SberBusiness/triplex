import * as React from 'react';

/**
 * Основное сообщение нотификации.
 */
export const NotificationBodyContent: React.FC = ({children}) => <div className="cssClass[notificationBodyContent]">{children}</div>;

NotificationBodyContent.displayName = 'NotificationBodyContent';
