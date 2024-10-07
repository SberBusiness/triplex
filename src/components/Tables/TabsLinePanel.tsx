import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TabsLinePanelLinks} from '@sberbusiness/triplex/components/Tables/TabsLinePanelLinks';

/** Свойства компонента TabsLinePanel. */
export interface ITabsLinePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    // Свойство не используется в компоненте, нужно для типизации т.к. MasterTable передает isLoading всем дочерним компонентам.
    isLoading?: boolean;
}

/** Внутренние составляющие панели табличных фильтров. */
export interface ITabsLinePanelComposition {
    Links: typeof TabsLinePanelLinks;
}

/** Компонент TabsLinePanel. */
export const TabsLinePanel: React.FC<ITabsLinePanelProps> & ITabsLinePanelComposition = ({
    children,
    className,
    isLoading,
    ...htmlDivAttributes
}) => (
    <div className={classnames(className, 'cssClass[tabsLinePanel]')} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsLinePanel.Links = TabsLinePanelLinks;
TabsLinePanel.displayName = 'TabsLinePanel';
