import {StatusTrackerDeprecatedFooterText} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedFooterText';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Интерфейс компонента подвала статус трекера.
 * @prop {React.ReactElement | React.ReactElement[]} children Children.
 */
export interface IStatusTrackerDeprecatedFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement | React.ReactElement[];
}

/**
 * Компонент подвала у статус трекера.
 */
export class StatusTrackerDeprecatedFooter extends React.Component<IStatusTrackerDeprecatedFooterProps> {
    public static displayName = 'StatusTrackerDeprecatedFooter';

    public static Text = StatusTrackerDeprecatedFooterText;

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;
        return (
            <div className={classnames(className, 'cssClass[statusTrackerDeprecatedFooter]')} {...htmlDivAttributes}>
                <div className="cssClass[statusTrackerDeprecatedFooterContent]">{children}</div>
            </div>
        );
    }
}
