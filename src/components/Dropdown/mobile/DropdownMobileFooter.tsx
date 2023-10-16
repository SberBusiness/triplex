import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface IDropdownFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMobileFooter = React.forwardRef<HTMLDivElement, IDropdownFooterProps>(
    ({children, className, ...htmlAttributes}, ref) => (
        <div className={classnames('cssClass[dropdownMobileFooter]', className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileFooter.displayName = 'DropdownMobileFooter';
