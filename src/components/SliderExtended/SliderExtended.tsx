import React from 'react';
import {useState, useLayoutEffect} from 'react';
import range from 'lodash.range';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SliderExtendedDot} from './components/SliderExtendedDot/SliderExtendedDot';
import {SliderExtendedMarks} from './components/SliderExtendedMarks/SliderExtendedMarks';
import {SliderExtendedMark} from './components/SliderExtendedMarks/SliderExtendedMark';
import {SliderExtendedRail} from './components/SliderExtendedRail';
import {SliderExtendedTrack} from './components/SliderExtendedTrack/SliderExtendedTrack';
import {ISliderExtendedDot, ISliderExtendedStep, SliderExtendedContext} from './SliderExtendedContext';
import {SliderExtendedUtils} from './SliderExtendedUtils';
import {SliderExtendedTooltip} from './components/SliderExtendedTooltip/SliderExtendedTooltip';

export interface ISliderExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Слайдер не активен.
     */
    disabled?: boolean;
    /**
     * Максимальное значение слайдера.
     */
    max: number;
    /**
     * Минимальное значение слайдера.
     */
    min: number;
    /**
     * Реверсивный слайдер.
     */
    reverse?: boolean;
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Будет 3 возможные позиции между min и max. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     */
    step: number | number[];
}

/**
 * Компонент SliderExtended.
 */
export const SliderExtended: React.FC<ISliderExtendedProps> & {
    Dot: typeof SliderExtendedDot;
    Mark: typeof SliderExtendedMark;
    Marks: typeof SliderExtendedMarks;
    Rail: typeof SliderExtendedRail;
    Track: typeof SliderExtendedTrack;
    Tooltip: typeof SliderExtendedTooltip;
} = ({children, disabled, max, min, reverse = false, step, ...htmlDivAttributes}) => {
    const [dots, setDots] = useState<ISliderExtendedDot[]>([]);
    const [focused, setFocused] = useState(false);
    const [isHoverOrDragTrack, setIsHoverOrDragTrack] = useState(false);
    const [railNode, setRailNode] = useState<HTMLDivElement | null>(null);
    const [steps, setSteps] = useState<ISliderExtendedStep[]>([]);

    const addDot = (dot: ISliderExtendedDot) => {
        setDots((prevDots) => {
            const nextDots = [...prevDots];
            nextDots.push(dot);

            return nextDots;
        });
    };

    const removeDot = (id: string) => {
        setDots((prevDots) => [...prevDots.filter((dot) => dot.id !== id)]);
    };

    const updateDot = (dot: Pick<ISliderExtendedDot, 'id'> & Partial<ISliderExtendedDot>) => {
        setDots((prevDots) => {
            const nextDots = [...prevDots];
            nextDots.some((d) => {
                if (d.id === dot.id) {
                    d = Object.assign(d, dot);
                    return true;
                }
            });

            return nextDots;
        });
    };

    useLayoutEffect(() => {
        /**
         * Генерирует массив точек остановки при перемещении Dot.
         * Для каждой точки указывается позиция на треке в % и value.
         */
        const generateSteps = () => {
            if (typeof step === 'number') {
                const values = [...range(min, max, step), max];

                setSteps(
                    values.map((value) => ({
                        value,
                        normalizedValue: SliderExtendedUtils.getNormalizedValue({max, min, value}),
                    }))
                );
            } else {
                setSteps(
                    /* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */
                    step.map((val) => ({
                        value: val,
                        normalizedValue: SliderExtendedUtils.getNormalizedValue({max, min, value: val}),
                    }))
                );
            }
        };

        generateSteps();
    }, [min, max, step]);

    if (!steps.length) {
        return null;
    }

    return (
        <SliderExtendedContext.Provider
            value={{
                addDot,
                disabled: Boolean(disabled),
                dots,
                focused,
                isHoverOrDragTrack,
                max,
                min,
                railNode,
                reverse: Boolean(reverse),
                removeDot,
                setFocused,
                setIsHoverOrDragTrack,
                setRailNode,
                steps,
                updateDot,
            }}
        >
            <div
                className={classnames('cssClass[sliderExtended]', {
                    'cssClass[disabled]': Boolean(disabled),
                })}
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </SliderExtendedContext.Provider>
    );
};

SliderExtended.displayName = 'SliderExtended';
SliderExtended.Dot = SliderExtendedDot;
SliderExtended.Mark = SliderExtendedMark;
SliderExtended.Marks = SliderExtendedMarks;
SliderExtended.Rail = SliderExtendedRail;
SliderExtended.Track = SliderExtendedTrack;
SliderExtended.Tooltip = SliderExtendedTooltip;
