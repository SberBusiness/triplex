import React from 'react';
import {NotificationHeader} from '@sberbusiness/triplex/components/Notification/components/NotificationHeader';
import {NotificationBodyContent} from '@sberbusiness/triplex/components/Notification/components/NotificationBodyContent';
import {UnorderedList} from '@sberbusiness/triplex/components/List/UnorderedList';
import {NotificationFooter} from '@sberbusiness/triplex/components/Notification/components/NotificationFooter';

/** Свойства компонента NotificationBody. */
interface INotificationBodyProps {
    children?: React.ReactNode;
}

export interface INotificationBodySFC extends React.FC<INotificationBodyProps> {
    Header: typeof NotificationHeader;
    Content: typeof NotificationBodyContent;
    List: typeof UnorderedList;
    Footer: typeof NotificationFooter;
}

/** Тело нотификации. Состоит из 4х уровней Header, Content, List, Footer. */
export const NotificationBody: INotificationBodySFC = ((props) => {
    const {children} = props;

    return <div className={'cssClass[notificationBody]'}>{children}</div>;
}) as INotificationBodySFC;

NotificationBody.displayName = 'NotificationBody';
NotificationBody.Header = NotificationHeader;
NotificationBody.Content = NotificationBodyContent;
NotificationBody.List = UnorderedList;
NotificationBody.Footer = NotificationFooter;
