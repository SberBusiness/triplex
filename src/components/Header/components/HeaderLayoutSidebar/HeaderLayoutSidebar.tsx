import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {HeaderLayoutSidebarContent} from './HeaderLayoutSidebarContent';
import {HeaderLayoutSidebarSidebar} from './HeaderLayoutSidebarSidebar';

interface IHeaderLayoutSidebarFC extends React.FC<React.HTMLAttributes<HTMLDivElement>> {
    Content: typeof HeaderLayoutSidebarContent;
    Sidebar: typeof HeaderLayoutSidebarSidebar;
}

/**
 * Layout для Header с sidebar.
 */
export const HeaderLayoutSidebar: IHeaderLayoutSidebarFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerLayoutSidebar]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderLayoutSidebar.Content = HeaderLayoutSidebarContent;
HeaderLayoutSidebar.Sidebar = HeaderLayoutSidebarSidebar;
HeaderLayoutSidebar.displayName = 'HeaderLayoutSidebar';
