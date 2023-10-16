import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface IDropdownMobileListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMobileList = React.forwardRef<HTMLDivElement, IDropdownMobileListProps>(
    ({children, className, ...htmlAttributes}, ref) => (
        <div className={classnames('cssClass[dropdownMobileList]', className)} ref={ref} role="listbox" {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileList.displayName = 'DropdownMobileList';
