import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Header sidebar.
 */
export const HeaderLayoutSidebarSidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerLayoutSidebarSidebar]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderLayoutSidebarSidebar.displayName = 'HeaderLayoutSidebarSidebar';
