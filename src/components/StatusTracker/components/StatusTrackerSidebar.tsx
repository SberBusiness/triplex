import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента StatusTrackerSidebar. */
export interface StatusTrackerSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Боковая панель StatusTracker. */
export const StatusTrackerSidebar: React.FC<StatusTrackerSidebarProps> = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[statusTrackerSidebar]', className);

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};
