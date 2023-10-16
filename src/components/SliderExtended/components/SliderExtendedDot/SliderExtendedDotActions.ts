import {ISliderExtendedDot, ISliderExtendedStep} from '../../SliderExtendedContext';

interface ISliderExtendedDotActions {
    /**
     * Перемещение точки на предыдущий шаг.
     */
    moveToPrevStep: (dot: ISliderExtendedDot, steps: ISliderExtendedStep[]) => void;
    /**
     * Перемещение точки на следующий шаг.
     */
    moveToNextStep: (dot: ISliderExtendedDot, steps: ISliderExtendedStep[]) => void;
}

export const SliderExtendedDotActions: ISliderExtendedDotActions = {
    moveToPrevStep: (dot, steps) => {
        if (dot.stepIndex > 0) {
            dot.changeValue(steps[dot.stepIndex - 1].value);
        }
    },
    moveToNextStep: (dot, steps) => {
        if (dot.stepIndex < steps.length - 1) {
            dot.changeValue(steps[dot.stepIndex + 1].value);
        }
    },
};
