import * as React from 'react';

/**
 * Свойства NotificationBodyContent.
 * @prop {React.ReactNode} children Дочерний элемент тела нотификации.
 */
interface INotificationBodyContentProps {
    children: React.ReactNode;
}

/**
 * Максимально допустимая длина текста.
 */
const MAX_TEXT_LENGTH = 160;

/**
 * Основное сообщение нотификации.
 */
export const NotificationBodyContent: React.FC<INotificationBodyContentProps> = ({children}) => {
    const content = typeof children === 'string' ? children.substring(0, MAX_TEXT_LENGTH) : children;

    return <div className="cssClass[notificationBodyContent]">{content}</div>;
};

NotificationBodyContent.displayName = 'NotificationBodyContent';
