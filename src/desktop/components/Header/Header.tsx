import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {HeaderTabs} from '@sberbusiness/triplex/desktop/components/Header/components/HeaderTabs/HeaderTabs';
import {HeaderTitle} from '@sberbusiness/triplex/desktop/components/Header/components/HeaderTitle/HeaderTitle';
import {HeaderSubheader} from '@sberbusiness/triplex/desktop/components/Header/components/HeaderSubheader/HeaderSubheader';
import {HeaderLink} from '@sberbusiness/triplex/desktop/components/Header/components/HeaderLink/HeaderLink';
import {HeaderLayoutSidebar} from './components/HeaderLayoutSidebar/HeaderLayoutSidebar';

export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    sticky?: boolean;
}

interface IHeaderFC extends React.FC<IHeaderProps> {
    LayoutSidebar: typeof HeaderLayoutSidebar;
    Link: typeof HeaderLink;
    Subhead: typeof HeaderSubheader;
    Tabs: typeof HeaderTabs;
    Title: typeof HeaderTitle;
}

export const Header: IHeaderFC = ({children, className, sticky, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[header]', className, {
            'cssClass[sticky]': Boolean(sticky),
        })}
        {...htmlDivAttributes}
    >
        {children}
    </div>
);

Header.displayName = 'Header';
Header.LayoutSidebar = HeaderLayoutSidebar;
Header.Link = HeaderLink;
Header.Subhead = HeaderSubheader;
Header.Tabs = HeaderTabs;
Header.Title = HeaderTitle;
