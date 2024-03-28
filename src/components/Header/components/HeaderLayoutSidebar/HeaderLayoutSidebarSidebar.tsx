import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderLayoutSidebarSidebar. */
interface IHeaderLayoutSidebarSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Header sidebar. */
export const HeaderLayoutSidebarSidebar: React.FC<IHeaderLayoutSidebarSidebarProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerLayoutSidebarSidebar]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderLayoutSidebarSidebar.displayName = 'HeaderLayoutSidebarSidebar';
