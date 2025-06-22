import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface ITableBasicSettingsBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TableBasicSettingsBody = React.forwardRef<HTMLDivElement, ITableBasicSettingsBodyProps>(
    ({children, className, ...htmlDivAttributes}, ref) => (
        <div className={classnames('cssClass[tableBasicSettingsBody]', className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    )
);

TableBasicSettingsBody.displayName = 'TableBasicSettingsBody';
