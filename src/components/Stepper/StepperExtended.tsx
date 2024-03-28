import React, {useState, useEffect} from 'react';
import {IStepperType} from './enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {StepperExtendedContext} from './StepperExtendedContext';
import {StepperWrapper} from './StepperWrapper';
import {StepperStep} from './StepperStep';
import {StepperProgress} from './StepperProgress';

/** Внутренние составляющие StepperExtended. */
interface IStepperExtendedComposition {
    Progress: typeof StepperProgress;
    Step: typeof StepperStep;
    Wrapper: typeof StepperWrapper;
}

/** Свойства компонента StepperExtended. */
export interface IStepperExtendedProps extends React.HTMLAttributes<HTMLOListElement> {
    /** Тип списка. */
    type?: IStepperType;
    /** Уникальный идентификатор выбранного шага. */
    selectedStepId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (id: string) => void;
    /** Ссылка на список шагов. */
    forwardedRef?: React.Ref<HTMLOListElement>;
}

/** Компонент StepperExtended, расширенная версия Stepper. */
export const StepperExtended: React.FC<IStepperExtendedProps> & IStepperExtendedComposition = ({
    children,
    className,
    type = IStepperType.MAIN,
    onSelectStep,
    selectedStepId,
    forwardedRef,
    ...rest
}) => {
    const [selectedId, setSelectedId] = useState(selectedStepId);
    const classNames = classnames('cssClass[stepperExtended]', className);

    useEffect(() => setSelectedId(selectedStepId), [setSelectedId, selectedStepId]);

    const handleSelect = (id: string) => onSelectStep(id);

    return (
        <StepperExtendedContext.Provider value={{onSelectStep: handleSelect, selectedId, type}}>
            <ol className={classNames} role="tablist" {...rest} ref={forwardedRef}>
                {children}
            </ol>
        </StepperExtendedContext.Provider>
    );
};

StepperExtended.Progress = StepperProgress;
StepperExtended.Step = StepperStep;
StepperExtended.Wrapper = StepperWrapper;
