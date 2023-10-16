import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства StepperProgress. */
export interface IStepperProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
    /** Прогресс в процентах от 0 до 100. */
    value: number;
}

/** Индикатор прогресса. */
export const StepperProgress: React.FC<IStepperProgressProps> = ({className, value, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[stepperProgress]', className)} {...htmlDivAttributes}>
        <div className="cssClass[progressBar]" style={{width: `${value}%`}} />
    </div>
);
