import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента HeaderTabsControls. */
interface IHeaderTabsControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTabs. */
export class HeaderTabsControls extends React.Component<IHeaderTabsControlsProps> {
    public static displayName = 'HeaderTabsControls';

    public render(): React.ReactNode {
        const {children, className, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[headerTabsControls]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
