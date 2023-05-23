import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {StatusTrackerDeprecatedBody} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedBody';
import {StatusTrackerDeprecatedFooter} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedFooter';
import {StatusTrackerDeprecatedSteps} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedSteps';
import {
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import * as React from 'react';

/** Типизация дочерних элементов статус трекера (полный список). */
type TStatusTrackerChildrenFull = [
    React.ReactElement<StatusTrackerDeprecatedSteps>,
    React.ReactElement<StatusTrackerDeprecatedBody>,
    React.ReactElement<StatusTrackerDeprecatedFooter>
];

/** Типизация дочерних элементов статус трекера (без футера). */
type TStatusTrackerChildrenWithoutFooter = [
    React.ReactElement<StatusTrackerDeprecatedSteps>,
    React.ReactElement<StatusTrackerDeprecatedBody>
];

/** Типизация дочерних элементов статус трекера. */
type TStatusTrackerChildren = TStatusTrackerChildrenFull | TStatusTrackerChildrenWithoutFooter;

/**
 * Интерфейс компонента статус трекера.
 * @prop {StatusTrackerStep} currentStep Активный шаг у мастера у компонента StatusTracker.
 * @prop {StatusTrackerStatus} status Состояние у компонента StatusTracker.
 * @prop {TStatusTrackerChildren} children Children.
 */
export interface IStatusTrackerDeprecatedProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep: StatusTrackerDeprecatedStepNumber;
    status: StatusTrackerDeprecatedStatus;
    children: TStatusTrackerChildren;
}

/**
 * Компонент статус трекера.
 * @deprecated Следует использовать StatusTracker.
 */
export class StatusTrackerDeprecated extends React.Component<IStatusTrackerDeprecatedProps> {
    public static displayName = 'StatusTrackerDeprecated';

    public static Steps = StatusTrackerDeprecatedSteps;
    public static Body = StatusTrackerDeprecatedBody;
    public static Footer = StatusTrackerDeprecatedFooter;

    public render(): React.ReactNode {
        const {children, className, currentStep, status, ...htmlDivAttributes} = this.props;

        const mixedPropsChildren = React.Children.map(children, (child: React.ReactElement) => {
            if (child) {
                let props = {};
                switch (child.type) {
                    case StatusTrackerDeprecatedSteps:
                        props = {currentStep, status};
                        break;
                    case StatusTrackerDeprecatedBody:
                        props = {status};
                        break;
                }

                return React.cloneElement(child, props);
            }
            return child;
        });

        const cn = classnames(className, status, 'cssClass[statusTrackerDeprecated]');
        return (
            <div className={cn} {...htmlDivAttributes}>
                {mixedPropsChildren}
            </div>
        );
    }
}
