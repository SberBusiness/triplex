import React, {useState, useEffect, useRef, useCallback} from 'react';
import isEqual from 'lodash.isequal';
import {scrollSmoothHorizontally} from '@sberbusiness/triplex/utils/scroll';

export interface ICarouselExtendedButtonProvideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Свойства компонента CarouselExtended. */
export interface ICarouselExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Рендер-функция кнопки "Назад". */
    buttonPrev: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /** Рендер-функция кнопки "Вперёд". */
    buttonNext: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /** Величина (px) прокрутки при клике на кнопку "Назад". */
    stepPrev: number;
    /** Величина (px) прокрутки при клике на кнопку "Вперёд". */
    stepNext: number;
}

/** Карусель. */
export const CarouselExtended = React.forwardRef<HTMLDivElement, ICarouselExtendedProps>(
    ({children, buttonPrev, buttonNext, stepPrev, stepNext, ...htmlDivAttributes}, ref) => {
        const [controlsState, setControlsState] = useState({prevDisabled: true, nextDisabled: false, hidden: true});
        const carouselRef = useRef<HTMLDivElement | null>(null);

        /** Функция, контролирующая состояние кнопок. */
        const checkControls = useCallback((): void => {
            const carousel = carouselRef.current!;
            const newState = {
                prevDisabled: Math.round(carousel.scrollLeft) <= 0,
                nextDisabled: Math.round(carousel.scrollLeft) + carousel.offsetWidth >= carousel.scrollWidth,
                hidden: carousel.scrollWidth == carousel.clientWidth,
            };

            if (isEqual(newState, controlsState) == false) {
                setControlsState(newState);
            }
        }, [controlsState]);

        useEffect(() => {
            window.addEventListener('resize', checkControls);
            document.addEventListener('scroll', checkControls);

            return () => {
                window.removeEventListener('resize', checkControls);
                document.removeEventListener('scroll', checkControls);
            };
        }, [checkControls]);

        useEffect(() => {
            checkControls();
        }, [children, checkControls]);

        /** Обработчик клика по кнопке "Назад". */
        const handleMovePrev = (): void => {
            scrollSmoothHorizontally(carouselRef.current!, Math.floor(-stepPrev));
        };

        /** Обработчик клика по кнопке "Вперёд". */
        const handleMoveNext = (): void => {
            scrollSmoothHorizontally(carouselRef.current!, Math.ceil(stepNext));
        };

        /** Функция для хранения ссылки. */
        const setRef = (instance: HTMLDivElement | null) => {
            carouselRef.current = instance;
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <div {...htmlDivAttributes}>
                {buttonPrev({onClick: handleMovePrev, disabled: controlsState.prevDisabled, hidden: controlsState.hidden})}
                <div className="cssClass[carouselExtended]" onScroll={checkControls} ref={setRef}>
                    {children}
                </div>
                {buttonNext({onClick: handleMoveNext, disabled: controlsState.nextDisabled, hidden: controlsState.hidden})}
            </div>
        );
    }
);

CarouselExtended.displayName = 'CarouselExtended';
