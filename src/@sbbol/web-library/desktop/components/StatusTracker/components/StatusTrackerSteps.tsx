import {IStatusTrackerStepProps, StatusTrackerStep} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerStep';
import {StatusTrackerStepDivider} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerStepDivider';
import {
    EStatusTrackerStepDividerType,
    StatusTrackerStatus,
    StatusTrackerStepNumber,
} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {mapTrackerStatusToStepStatus} from '@sbbol/web-library/desktop/components/StatusTracker/utils';
import * as React from 'react';
import {calcPosition} from '@sbbol/web-library/desktop/components/Step/Step';

/**
 * Статус, доступный лишь на последнем шаге мастера у компонента StatusTracker.
 */
const lastStepStatus = StatusTrackerStatus.SUCCESS;

/**
 * Интерфейс компонента для шагов мастера у статус трекера.
 * @prop {StatusTrackerStep} [currentStep] Активный шаг у мастера у компонента StatusTracker.
 * @prop {StatusTrackerStatus} [status] Состояние у компонента StatusTracker.
 */
export interface IStatusTrackerStepsProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep?: StatusTrackerStepNumber;
    status?: StatusTrackerStatus;
    children:
        | [
              React.ReactElement<IStatusTrackerStepProps>,
              React.ReactElement<IStatusTrackerStepProps>,
              React.ReactElement<IStatusTrackerStepProps>,
              React.ReactElement<IStatusTrackerStepProps>
          ]
        | [
              React.ReactElement<IStatusTrackerStepProps>,
              React.ReactElement<IStatusTrackerStepProps>,
              React.ReactElement<IStatusTrackerStepProps>
          ];
}

/**
 * Компонент шагов мастера статус трекера.
 */
export class StatusTrackerSteps extends React.Component<IStatusTrackerStepsProps> {
    public static displayName = 'StatusTrackerSteps';

    public static Step = StatusTrackerStep;

    public render(): JSX.Element {
        const {children, className, currentStep, status, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[statusTrackerSteps]')} {...htmlDivAttributes}>
                {this.renderSteps()}
            </div>
        );
    }

    private renderSteps = () => {
        const {currentStep, status, children} = this.props;
        const result: React.ReactNode[] = [];

        const steps = React.Children.toArray(children);
        const stepCount = steps.length;
        const currentStepNumber = Number(currentStep);

        if (stepCount < 3 || stepCount > 4) {
            throw new Error(`Необходимо использовать 3 или 4 шага! Сейчас: ${stepCount}`);
        }

        if (currentStepNumber > stepCount) {
            throw new Error(`Текущий шаг (${currentStepNumber}) не может быть больше последнего (${stepCount})!`);
        }

        if (currentStepNumber !== stepCount && lastStepStatus === status) {
            throw new Error(`Конечные статусы можно использовать только на последнем шаге!`);
        }

        for (let i = 0; i < steps.length; i++) {
            const iteratorStep = (i + 1) as StatusTrackerStepNumber;
            const stepStatus = mapTrackerStatusToStepStatus(currentStep!, status!, iteratorStep);

            if (iteratorStep !== StatusTrackerStepNumber.ONE) {
                let type = EStatusTrackerStepDividerType.FOUR_STEP_SHORT;

                if (stepCount === 3) {
                    type = EStatusTrackerStepDividerType.THREE_STEP;
                } else if (stepCount === 4 && iteratorStep === StatusTrackerStepNumber.THREE) {
                    type = EStatusTrackerStepDividerType.FOUR_STEP_LONG;
                }

                result.push(<StatusTrackerStepDivider type={type} status={stepStatus} key={`divider-${i}`} />);
            }

            const child = React.cloneElement(steps[i] as React.ReactElement, {
                step: iteratorStep,
                key: i,
                status: stepStatus,
                position: calcPosition(stepCount, i),
            });
            result.push(child);
        }

        return result;
    };
}
