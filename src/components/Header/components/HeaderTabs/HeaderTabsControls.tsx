import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabsControls. */
interface IHeaderTabsControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTabs. */
export const HeaderTabsControls: React.FC<IHeaderTabsControlsProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerTabsControls]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTabsControls.displayName = 'HeaderTabsControls';
