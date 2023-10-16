import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Блок с кнопками действий HeaderTabs.
 */
export class HeaderTabsControls extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
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
