import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Блок контента для Header с sidebar.
 */
export const HeaderLayoutSidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerLayoutSidebarContent]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderLayoutSidebarContent.displayName = 'HeaderLayoutSidebarContent';
