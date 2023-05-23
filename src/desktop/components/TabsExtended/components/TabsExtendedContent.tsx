import * as React from 'react';
import {TabsExtendedTabsWrapper} from './TabsExtendedTabsWrapper';
import {TabsExtendedTab} from './TabsExtendedTab';
import {TabsExtendedTabButton} from './TabsExtendedTabButton';
import {TabsExtendedDropdownWrapper} from './TabsExtendedDropdownWrapper';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

export interface ITabsExtendedContentComposition {
    TabsWrapper: typeof TabsExtendedTabsWrapper;
    Tab: typeof TabsExtendedTab;
    TabButton: typeof TabsExtendedTabButton;
    DropdownWrapper: typeof TabsExtendedDropdownWrapper;
}

export interface ITabsExtendedContentProps extends React.HTMLAttributes<HTMLDivElement> {}

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
