import React from 'react';
import {Tabs} from '@sberbusiness/triplex/components/Tabs/Tabs';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabsContent. */
interface IHeaderTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер табов. */
export class HeaderTabsContent extends React.PureComponent<IHeaderTabsContentProps> {
    public static displayName = 'HeaderTabsContent';

    public static Tabs = Tabs;

    public render(): React.ReactNode {
        const {children, className} = this.props;

        return <div className={classnames(className, 'cssClass[headerTabsContent]')}>{children}</div>;
    }
}
