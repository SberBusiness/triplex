import {
    IStatusTrackerDeprecatedStepProps,
    StatusTrackerDeprecatedStep,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedStep';
import {StatusTrackerDeprecatedStepDivider} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedStepDivider';
import {
    EStatusTrackerDeprecatedStepDividerType,
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {mapTrackerStatusToStepStatus} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/utils';
import * as React from 'react';
import {calcPosition} from '@sberbusiness/triplex/desktop/components/Step/Step';

/**
 * Статус, доступный лишь на последнем шаге мастера у компонента StatusTracker.
 */
const lastStepStatus = StatusTrackerDeprecatedStatus.SUCCESS;

/**
 * Интерфейс компонента для шагов мастера у статус трекера.
 * @prop {StatusTrackerStep} [currentStep] Активный шаг у мастера у компонента StatusTracker.
 * @prop {StatusTrackerStatus} [status] Состояние у компонента StatusTracker.
 */
export interface IStatusTrackerDeprecatedStepsProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep?: StatusTrackerDeprecatedStepNumber;
    status?: StatusTrackerDeprecatedStatus;
    children:
        | [
              React.ReactElement<IStatusTrackerDeprecatedStepProps>,
              React.ReactElement<IStatusTrackerDeprecatedStepProps>,
              React.ReactElement<IStatusTrackerDeprecatedStepProps>,
              React.ReactElement<IStatusTrackerDeprecatedStepProps>
          ]
        | [
              React.ReactElement<IStatusTrackerDeprecatedStepProps>,
              React.ReactElement<IStatusTrackerDeprecatedStepProps>,
              React.ReactElement<IStatusTrackerDeprecatedStepProps>
          ];
}

/**
 * Компонент шагов мастера статус трекера.
 */
export class StatusTrackerDeprecatedSteps extends React.Component<IStatusTrackerDeprecatedStepsProps> {
    public static displayName = 'StatusTrackerDeprecatedSteps';

    public static Step = StatusTrackerDeprecatedStep;

    public render(): JSX.Element {
        const {children, className, currentStep, status, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[statusTrackerDeprecatedSteps]')} {...htmlDivAttributes}>
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
            const iteratorStep = (i + 1) as StatusTrackerDeprecatedStepNumber;
            const stepStatus = mapTrackerStatusToStepStatus(currentStep!, status!, iteratorStep);

            if (iteratorStep !== StatusTrackerDeprecatedStepNumber.ONE) {
                let type = EStatusTrackerDeprecatedStepDividerType.FOUR_STEP_SHORT;

                if (stepCount === 3) {
                    type = EStatusTrackerDeprecatedStepDividerType.THREE_STEP;
                } else if (stepCount === 4 && iteratorStep === StatusTrackerDeprecatedStepNumber.THREE) {
                    type = EStatusTrackerDeprecatedStepDividerType.FOUR_STEP_LONG;
                }

                result.push(<StatusTrackerDeprecatedStepDivider type={type} status={stepStatus} key={`divider-${i}`} />);
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
