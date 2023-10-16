import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства контейнера для иконки StatusTracker. */
export interface StatusTrackerIconProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для иконки StatusTracker. */
export const StatusTrackerIcon: React.FC<StatusTrackerIconProps> = (props) => {
    const {children, className, ...rest} = props;
    const classNames = classnames('cssClass[statusTrackerIcon]', className);

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};
