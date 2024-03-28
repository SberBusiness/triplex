import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {HeaderTabs} from '@sberbusiness/triplex/components/Header/components/HeaderTabs/HeaderTabs';
import {HeaderTitle} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitle';
import {HeaderSubheader} from '@sberbusiness/triplex/components/Header/components/HeaderSubheader/HeaderSubheader';
import {HeaderLink} from '@sberbusiness/triplex/components/Header/components/HeaderLink/HeaderLink';
import {HeaderLayoutSidebar} from './components/HeaderLayoutSidebar/HeaderLayoutSidebar';

/** Свойства компонента Header. */
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Header прилипает к верхней границе экрана при скролле.
     * Свойство работает на экранах высотой более 800px и шириной более 1024px.
     * */
    sticky?: boolean;
}

interface IHeaderFC extends React.FC<IHeaderProps> {
    LayoutSidebar: typeof HeaderLayoutSidebar;
    Link: typeof HeaderLink;
    Subhead: typeof HeaderSubheader;
    Tabs: typeof HeaderTabs;
    Title: typeof HeaderTitle;
}

/** Заголовок. */
export const Header: IHeaderFC = ({children, className, sticky, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[header]', className, {
            'cssClass[sticky]': Boolean(sticky),
        })}
        {...htmlDivAttributes}
        data-tinfo="12.0.0"
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
