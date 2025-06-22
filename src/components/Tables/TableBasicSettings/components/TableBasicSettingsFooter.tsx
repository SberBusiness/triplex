import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface ITableBasicSettingsFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TableBasicSettingsFooter = React.forwardRef<HTMLDivElement, ITableBasicSettingsFooterProps>(
    ({children, className, ...htmlDivAttributes}, ref) => (
        <div className={classnames('cssClass[tableBasicSettingsFooter]', className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    )
);

TableBasicSettingsFooter.displayName = 'TableBasicSettingsFooter';
