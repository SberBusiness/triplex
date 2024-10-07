import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TabsLinePanelLinks. */
export interface ITabsLinePanelLinksProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

/** Компонент TabsLinePanelLinks. */
export const TabsLinePanelLinks: React.FC<ITabsLinePanelLinksProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[tabsLinePanelLinks]')} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsLinePanelLinks.displayName = 'TabsLinePanelLinks';
