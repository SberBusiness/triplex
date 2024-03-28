import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderLayoutSidebarContent. */
interface IHeaderLayoutSidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок контента для Header с sidebar. */
export const HeaderLayoutSidebarContent: React.FC<IHeaderLayoutSidebarContentProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerLayoutSidebarContent]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderLayoutSidebarContent.displayName = 'HeaderLayoutSidebarContent';
