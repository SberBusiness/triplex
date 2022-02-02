import {HeaderTabsContent} from '@sbbol/web-library/desktop/components/Header/components/HeaderTabs/HeaderTabsContent';
import {HeaderTabsControls} from '@sbbol/web-library/desktop/components/Header/components/HeaderTabs/HeaderTabsControls';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

interface IHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Второй уровень Header. Содержит в себе табы и кнопки действий.
 */
export class HeaderTabs extends React.Component<IHeaderTabsProps> {
    public static displayName = 'HeaderTabs';

    public static Content = HeaderTabsContent;
    public static Controls = HeaderTabsControls;

    public render(): JSX.Element {
        const {children, className} = this.props;
        return <div className={classnames(className, 'cssClass[globalHeaderTabs]')}>{children}</div>;
    }
}
