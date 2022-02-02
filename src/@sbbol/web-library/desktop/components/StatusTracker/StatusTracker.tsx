import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {StatusTrackerBody} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerBody';
import {StatusTrackerFooter} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerFooter';
import {StatusTrackerSteps} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerSteps';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import * as React from 'react';

/** Типизация дочерних элементов статус трекера (полный список). */
type TStatusTrackerChildrenFull = [
    React.ReactElement<StatusTrackerSteps>,
    React.ReactElement<StatusTrackerBody>,
    React.ReactElement<StatusTrackerFooter>
];

/** Типизация дочерних элементов статус трекера (без футера). */
type TStatusTrackerChildrenWithoutFooter = [React.ReactElement<StatusTrackerSteps>, React.ReactElement<StatusTrackerBody>];

/** Типизация дочерних элементов статус трекера. */
type TStatusTrackerChildren = TStatusTrackerChildrenFull | TStatusTrackerChildrenWithoutFooter;

/**
 * Интерфейс компонента статус трекера.
 * @prop {StatusTrackerStep} currentStep Активный шаг у мастера у компонента StatusTracker.
 * @prop {StatusTrackerStatus} status Состояние у компонента StatusTracker.
 * @prop {TStatusTrackerChildren} children Children.
 */
export interface IStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep: StatusTrackerStepNumber;
    status: StatusTrackerStatus;
    children: TStatusTrackerChildren;
}

/**
 * Компонент статус трекера.
 */
export class StatusTracker extends React.Component<IStatusTrackerProps> {
    public static displayName = 'StatusTracker';

    public static Steps = StatusTrackerSteps;
    public static Body = StatusTrackerBody;
    public static Footer = StatusTrackerFooter;

    public render(): React.ReactNode {
        const {children, className, currentStep, status, ...htmlDivAttributes} = this.props;

        const mixedPropsChildren = React.Children.map(children, (child: React.ReactElement) => {
            if (child) {
                let props = {};
                switch (child.type) {
                    case StatusTrackerSteps:
                        props = {currentStep, status};
                        break;
                    case StatusTrackerBody:
                        props = {status};
                        break;
                }

                return React.cloneElement(child, props);
            }
            return child;
        });

        const cn = classnames(className, status, 'cssClass[statusTracker]');
        return (
            <div className={cn} {...htmlDivAttributes}>
                {mixedPropsChildren}
            </div>
        );
    }
}
