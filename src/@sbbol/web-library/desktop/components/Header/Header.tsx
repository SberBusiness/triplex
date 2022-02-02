import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {HeaderTabs} from '@sbbol/web-library/desktop/components/Header/components/HeaderTabs/HeaderTabs';
import {HeaderTitle} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitle';
import {HeaderSubheader} from '@sbbol/web-library/desktop/components/Header/components/HeaderSubheader/HeaderSubheader';

export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    sticky?: boolean;
}

interface IHeaderFC extends React.FC<IHeaderProps> {
    Title: typeof HeaderTitle;
    Tabs: typeof HeaderTabs;
    Subhead: typeof HeaderSubheader;
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

Header.Title = HeaderTitle;
Header.Tabs = HeaderTabs;
Header.Subhead = HeaderSubheader;
Header.displayName = 'Header';
