import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TabsLinePanelLinks} from '@sberbusiness/triplex/components/Tables/TabsLinePanelLinks';

/** Свойства компонента TabsLinePanel. */
export interface ITabsLinePanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие панели табличных фильтров. */
export interface ITabsLinePanelComposition extends React.FC<ITabsLinePanelProps> {
    Links: typeof TabsLinePanelLinks;
}

/** Компонент TabsLinePanel. */
export const TabsLinePanel: ITabsLinePanelComposition = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[tabsLinePanel]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsLinePanel.Links = TabsLinePanelLinks;
TabsLinePanel.displayName = 'TabsLinePanel';
