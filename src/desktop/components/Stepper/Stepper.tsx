import React, {useState, useEffect, useRef} from 'react';
import {IStepperExtendedProps, StepperExtended} from './StepperExtended';
import {StepperWrapper} from './StepperWrapper';
import {StepperStep, IStepperStepProps} from './StepperStep';
import {StepperProgress} from './StepperProgress';
import {
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
} from '@sberbusiness/triplex/desktop/components/CarouselExtended/CarouselExtended';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EScreenWidth} from '@sberbusiness/triplex/common/enums/EScreenWidth';
import {scrollSmoothHorizontally} from '@sberbusiness/triplex/desktop/common/utils/scroll';

/** Внутренние составляющие Stepper. */
interface IStepperComposition {
    Progress: typeof StepperProgress;
    Step: typeof StepperStep;
    Wrapper: typeof StepperWrapper;
}

/** Свойства шага в Stepper */
export interface IStepperStep extends IStepperStepProps {
    /** Название шага. */
    label?: React.ReactNode;
}

/** Свойства Stepper. */
export interface IStepperProps extends IStepperExtendedProps {
    children?: never;
    /** Шаги. */
    steps: Array<IStepperStep>;
}

/** Компонент Stepper, список шагов */
export const Stepper: React.FC<IStepperProps> & IStepperComposition = ({className, steps, selectedStepId, ...rest}) => {
    const [state, setState] = useState({stepPrev: 0, stepNext: 0});
    const carouselRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const classNames = classnames('cssClass[stepper]', className);

    const renderPrevButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonPrev]" {...rest}>
                <TabfoldercarouselleftSrvxIcon32 />
            </ButtonIcon>
        );

    const renderNextButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonNext]" {...rest}>
                <TabfoldercarouselrightSrvxIcon32 />
            </ButtonIcon>
        );

    useEffect(() => {
        const {current: carousel} = carouselRef;

        if (carousel) {
            const value = carousel.getBoundingClientRect().width * 0.3;

            setState({stepPrev: value, stepNext: value});
        }
    }, []);

    /** Выравнивание шага по правой части карусели. */
    const alignStepRight = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepRight: number) => {
        if (delta > 0) {
            // Текущий шаг – не последний, необходимо показать следующий шаг.
            if (step.nextElementSibling) {
                delta -= stepRight - step.nextElementSibling.getBoundingClientRect().right;
            }
            scrollSmoothHorizontally(carousel, Math.ceil(delta));
        }
    };

    /** Выравнивание шага по левой части карусели. */
    const alignStepLeft = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepLeft: number) => {
        if (delta < 0) {
            // Текущий шаг – не первый, необходимо показать предыдущий шаг.
            if (step.previousElementSibling) {
                delta -= stepLeft - step.previousElementSibling.getBoundingClientRect().left;
            }
            scrollSmoothHorizontally(carousel, Math.floor(delta));
        }
    };

    /** Выравнивание шага по центру карусели. */
    const alignStepCenter = (carousel: HTMLDivElement, delta: number) => {
        if (delta) {
            scrollSmoothHorizontally(carousel, delta);
        }
    };

    /** Выравнивание шага в карусели. */
    const alignStep = (carousel: HTMLDivElement, step: HTMLLIElement) => {
        const {left: carouselLeft, right: carouselRight, width: carouselWidth} = carousel.getBoundingClientRect();
        const {left: stepLeft, right: stepRight, width: stepWidth} = step.getBoundingClientRect();
        const carouselCenter = carouselLeft + carouselWidth / 2;
        const stepCenter = stepLeft + stepWidth / 2;

        if (window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches) {
            alignStepCenter(carousel, stepCenter - carouselCenter);
        } else if (carouselCenter > stepCenter) {
            alignStepLeft(carousel, step, stepLeft - carouselLeft - 32, stepLeft); // 32 - paddingLeft
        } else if (carouselCenter < stepCenter) {
            alignStepRight(carousel, step, stepRight - carouselRight + 32, stepRight); // 32 - paddingRight
        }
    };

    useEffect(() => {
        if (selectedStepId) {
            const {current: carousel} = carouselRef;
            const step = stepRefs.current[selectedStepId];

            if (carousel && step) {
                alignStep(carousel, step);
            }
        }
    }, [selectedStepId]);

    return (
        <CarouselExtended
            className="cssClass[stepperCarousel]"
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={state.stepPrev}
            stepNext={state.stepNext}
            ref={carouselRef}
        >
            <StepperExtended className={classNames} selectedStepId={selectedStepId} {...rest}>
                {steps.map(({label, ...step}) => (
                    <StepperExtended.Step key={step.id} forwardedRef={(instance) => (stepRefs.current[step.id] = instance)} {...step}>
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};

Stepper.Progress = StepperProgress;
Stepper.Wrapper = StepperWrapper;
Stepper.Step = StepperStep;
