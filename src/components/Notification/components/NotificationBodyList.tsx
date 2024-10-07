import React from 'react';
import {IUnorderedListProps, UnorderedList} from '@sberbusiness/triplex/components/UnorderedList/UnorderedList';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента NotificationBodyList. */
interface INotificationBodyListProps extends IUnorderedListProps {}

/** Список нотификации. */
export const NotificationBodyList: React.FC<INotificationBodyListProps> = ({className, ...props}) => (
    <UnorderedList className={classnames('cssClass[notificationBodyList]', className)} {...props} />
);

NotificationBodyList.displayName = 'NotificationBodyList';
