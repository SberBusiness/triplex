import React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/** Свойства StepperWrapper. */
export interface IStepperWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    // Признак отображения тени под Stepper.
    shadow?: boolean;
}

/** Компонент StepperWrapper, обёртка для Stepper. */
export const StepperWrapper: React.FC<IStepperWrapperProps> = ({children, className, shadow, ...rest}) => {
    const classNames = classnames('cssClass[stepperWrapper]', className, {
        'cssClass[withShadow]': Boolean(shadow),
    });

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};
