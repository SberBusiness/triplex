import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Низ сгруппированой нотификации.
 */
export const NotificationGroupedFooter = () => (
    <div>
        <div className={classnames('cssClass[notificationGroupedFooterItem]', 'cssClass[first]')} />
        <div className={classnames('cssClass[notificationGroupedFooterItem]', 'cssClass[second]')} />
    </div>
);
