import React from 'react';
import {HeaderTabsContent} from '@sberbusiness/triplex/components/Header/components/HeaderTabs/HeaderTabsContent';
import {HeaderTabsControls} from '@sberbusiness/triplex/components/Header/components/HeaderTabs/HeaderTabsControls';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabs. */
interface IHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IHeaderTabsFC extends React.FC<IHeaderTabsProps> {
    Content: typeof HeaderTabsContent;
    Controls: typeof HeaderTabsControls;
}

/** Второй уровень Header. Содержит в себе табы и кнопки действий. */
export const HeaderTabs: IHeaderTabsFC = ({children, className}) => (
    <div className={classnames(className, 'cssClass[globalHeaderTabs]')}>{children}</div>
);

HeaderTabs.Content = HeaderTabsContent;
HeaderTabs.Controls = HeaderTabsControls;
HeaderTabs.displayName = 'HeaderTabs';
