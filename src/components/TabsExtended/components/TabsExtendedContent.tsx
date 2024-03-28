import React from 'react';
import {TabsExtendedTabsWrapper} from './TabsExtendedTabsWrapper';
import {TabsExtendedTab} from './TabsExtendedTab';
import {TabsExtendedTabButton} from './TabsExtendedTabButton';
import {TabsExtendedDropdownWrapper} from './TabsExtendedDropdownWrapper';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TabsExtendedContent. */
export interface ITabsExtendedContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие TabsExtendedContent. */
export interface ITabsExtendedContentComposition {
    TabsWrapper: typeof TabsExtendedTabsWrapper;
    Tab: typeof TabsExtendedTab;
    TabButton: typeof TabsExtendedTabButton;
    DropdownWrapper: typeof TabsExtendedDropdownWrapper;
}

export const TabsExtendedContent: React.FC<ITabsExtendedContentProps> & ITabsExtendedContentComposition = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={classnames('cssClass[tabsExtendedContent]', className)} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsExtendedContent.TabsWrapper = TabsExtendedTabsWrapper;
TabsExtendedContent.Tab = TabsExtendedTab;
TabsExtendedContent.TabButton = TabsExtendedTabButton;
TabsExtendedContent.DropdownWrapper = TabsExtendedDropdownWrapper;
