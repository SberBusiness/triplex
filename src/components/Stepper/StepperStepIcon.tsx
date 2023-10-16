import React from 'react';
import {SuccessStsIcon16} from '@sberbusiness/icons/SuccessStsIcon16';
import {WarningStsIcon16} from '@sberbusiness/icons/WarningStsIcon16';
import {ErrorStsIcon16} from '@sberbusiness/icons/ErrorStsIcon16';
import {WaitStsIcon16} from '@sberbusiness/icons/WaitStsIcon16';
import {TickStsIcon16} from '@sberbusiness/icons/TickStsIcon16';

/** Возможные типы иконки в шаге. */
export enum EStepperStepIconType {
    SUCCESS = 'success',
    FILLED = 'filled',
    WAIT = 'wait',
    WARNING = 'warning',
    ERROR = 'error',
}

/** Свойства иконки в шаге. */
export type TStepperStepIconProps = {
    /** Тип иконки. */
    type: EStepperStepIconType;
};

/** Компонент StepperStepIcon, иконка в шаге. */
export const StepperStepIcon: React.FC<TStepperStepIconProps> = ({type}) => {
    switch (type) {
        case EStepperStepIconType.FILLED:
            return <TickStsIcon16 />;
        case EStepperStepIconType.SUCCESS:
            return <SuccessStsIcon16 />;
        case EStepperStepIconType.WARNING:
            return <WarningStsIcon16 />;
        case EStepperStepIconType.ERROR:
            return <ErrorStsIcon16 />;
        case EStepperStepIconType.WAIT:
            return <WaitStsIcon16 />;
        default:
            return null;
    }
};
