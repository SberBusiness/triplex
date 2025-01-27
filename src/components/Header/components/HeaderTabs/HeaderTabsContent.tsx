import React from 'react';
import {Tabs} from '@sberbusiness/triplex/components/Tabs/Tabs';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabsContent. */
interface IHeaderTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IHeaderTabsContentFC extends React.FC<IHeaderTabsContentProps> {
    Tabs: typeof Tabs;
}

/** Контейнер табов. */
export const HeaderTabsContent: IHeaderTabsContentFC = ({children, className}) => (
    <div className={classnames(className, 'cssClass[headerTabsContent]')}>{children}</div>
);

HeaderTabsContent.Tabs = Tabs;
HeaderTabsContent.displayName = 'HeaderTabsContent';
