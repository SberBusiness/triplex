import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента StatusTrackerBody. */
export interface StatusTrackerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело StatusTracker. */
export const StatusTrackerBody: React.FC<StatusTrackerBodyProps> = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[statusTrackerBody]', className);

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};
