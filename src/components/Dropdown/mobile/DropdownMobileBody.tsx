import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface IDropdownMobileBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMobileBody = React.forwardRef<HTMLDivElement, IDropdownMobileBodyProps>(
    ({children, className, ...htmlAttributes}, ref) => (
        <div className={classnames('cssClass[dropdownMobileContent]', className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileBody.displayName = 'DropdownMobileBody';
