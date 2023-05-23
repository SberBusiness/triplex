import {UnorderedList} from '@sberbusiness/triplex/desktop/components/List/UnorderedList';
import {NotificationBodyContent} from '@sberbusiness/triplex/desktop/components/Notification/components/NotificationBodyContent';
import {NotificationFooter} from '@sberbusiness/triplex/desktop/components/Notification/components/NotificationFooter';
import {NotificationHeader} from '@sberbusiness/triplex/desktop/components/Notification/components/NotificationHeader';
import * as React from 'react';

/**
 * Интерфейс компонента NotificationBody.
 * @param {typeof NotificationHeader} Header Сообщение в теле нотификации.
 * @param {typeof NotificationBodyContent} Text Сообщение в теле нотификации.
 * @param {typeof UnorderedList} List Список в теле нотификации.
 * @param {typeof NotificationFooter} Footer Сообщение в теле нотификации.
 *
 */
export interface INotificationBodySFC extends React.FC {
    Header: typeof NotificationHeader;
    Content: typeof NotificationBodyContent;
    List: typeof UnorderedList;
    Footer: typeof NotificationFooter;
}

/**
 * Тело нотификации. Состоит из 4х уровней Header, Content, List, Footer.
 */
export const NotificationBody: INotificationBodySFC = ((props) => {
    const {children} = props;

    return <div className={'cssClass[notificationBody]'}>{children}</div>;
}) as INotificationBodySFC;

NotificationBody.displayName = 'NotificationBody';
NotificationBody.Header = NotificationHeader;
NotificationBody.Content = NotificationBodyContent;
NotificationBody.List = UnorderedList;
NotificationBody.Footer = NotificationFooter;
