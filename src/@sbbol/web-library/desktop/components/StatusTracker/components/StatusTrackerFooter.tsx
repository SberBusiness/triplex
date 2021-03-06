import {StatusTrackerFooterText} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerFooterText';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Интерфейс компонента подвала статус трекера.
 * @prop {React.ReactElement | React.ReactElement[]} children Children.
 */
export interface IStatusTrackerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement | React.ReactElement[];
}

/**
 * Компонент подвала у статус трекера.
 */
export class StatusTrackerFooter extends React.Component<IStatusTrackerFooterProps> {
    public static displayName = 'StatusTrackerFooter';

    public static Text = StatusTrackerFooterText;

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;
        return (
            <div className={classnames(className, 'cssClass[statusTrackerFooter]')} {...htmlDivAttributes}>
                <div className="cssClass[statusTrackerFooterContent]">{children}</div>
            </div>
        );
    }
}
