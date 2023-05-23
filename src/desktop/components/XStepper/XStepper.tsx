import React from 'react';
import {XStepperStep, IXStepperStepProps} from '@sberbusiness/triplex/desktop/components/XStepper/XStepperStep';
import {EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {calcPosition} from '@sberbusiness/triplex/desktop/components/Step/Step';

/**
 * @prop {IXStepperStepProps[]} steps Шаги процесса.
 */
export interface IXStepperProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: IXStepperStepProps[];
}

/**
 * @deprecated Используйте компонент Stepper.
 * Компонент отображения горизонтального списка шагов.
 */
export const XStepper = ({className, steps, ...rest}: IXStepperProps): JSX.Element => {
    const stepCount = steps.length;

    return (
        <div className={classnames(className, 'cssClass[wrapper]')} {...rest}>
            {steps.reduce((acc, item, index): JSX.Element[] => {
                const {status} = item;
                const stepElement = <XStepperStep key={uniqueId()} position={calcPosition(stepCount, index)} {...item} />;

                return index === 0
                    ? [stepElement]
                    : [
                          ...acc,
                          <div
                              key={uniqueId()}
                              className={classnames('cssClass[line]', {
                                  'cssClass[warning]': status === EStepStatus.WARNING,
                                  'cssClass[error]': status === EStepStatus.ERROR,
                                  'cssClass[success]': status === EStepStatus.SUCCESS,
                                  'cssClass[wait]': status === EStepStatus.WAIT,
                              })}
                          />,
                          stepElement,
                      ];
            }, [] as JSX.Element[])}
        </div>
    );
};

XStepper.displayName = 'XStepper';
