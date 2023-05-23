import React from 'react';
import {StatusTrackerBody} from './components/StatusTrackerBody';
import {StatusTrackerSidebar} from './components/StatusTrackerSidebar';
import {StatusTrackerIcon} from './components/StatusTrackerIcon';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Внутренние составляющие StatusTracker. */
interface IStatusTrackerComposition {
    Body: typeof StatusTrackerBody;
    Sidebar: typeof StatusTrackerSidebar;
    Icon: typeof StatusTrackerIcon;
}

/** Свойства StatusTracker. */
export interface IStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент StatusTracker. */
export const StatusTracker: React.FC<IStatusTrackerProps> & IStatusTrackerComposition = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[statusTracker]', className);

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};

StatusTracker.Body = StatusTrackerBody;
StatusTracker.Sidebar = StatusTrackerSidebar;
StatusTracker.Icon = StatusTrackerIcon;
