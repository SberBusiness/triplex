import React from 'react';
import {IStepperType} from './enums';

/** Контекст компонента StepperExtended. */
export interface IStepperExtendedContext {
    /** Тип списка. */
    type?: IStepperType;
    /** Уникальный идентификатор выбранного шага. */
    selectedId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (selectedId: string) => void;
}

/** Контекст в StepperExtended. */
export const StepperExtendedContext = React.createContext<IStepperExtendedContext>({
    onSelectStep: () => {},
    selectedId: undefined,
});
