import React, {useState, useEffect, useRef, useCallback} from 'react';
import {scrollSmoothHorizontally} from '@sberbusiness/triplex/desktop/common/utils/scroll';

export interface ICarouselExtendedButtonProvideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Свойства CarouselExtended. */
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
        const [controlsHidden, setControlsHidden] = useState(false);
        const [buttonPrevDisabled, setButtonPrevDisabled] = useState(false);
        const [buttonNextDisabled, setButtonNextDisabled] = useState(true);
        const carouselRef = useRef<HTMLDivElement | null>(null);

        /** Функция, контролирующая состояние кнопок. */
        const checkControls = useCallback((): void => {
            const {current: carousel} = carouselRef;

            if (carousel) {
                if (carousel.scrollWidth === carousel.clientWidth) {
                    !controlsHidden && setControlsHidden(true);
                } else {
                    controlsHidden && setControlsHidden(false);

                    if (carousel.scrollLeft == 0) {
                        !buttonPrevDisabled && setButtonPrevDisabled(true);
                    } else {
                        buttonPrevDisabled && setButtonPrevDisabled(false);
                    }

                    // Округление необходимо, т.к. число может быть с плавающей точкой.
                    if (Math.round(carousel.scrollLeft) + carousel.offsetWidth == carousel.scrollWidth) {
                        !buttonNextDisabled && setButtonNextDisabled(true);
                    } else {
                        buttonNextDisabled && setButtonNextDisabled(false);
                    }
                }
            }
        }, [controlsHidden, buttonPrevDisabled, buttonNextDisabled]);

        useEffect(() => {
            checkControls();

            window.addEventListener('resize', checkControls);
            document.addEventListener('scroll', checkControls);

            return () => {
                window.removeEventListener('resize', checkControls);
                document.removeEventListener('scroll', checkControls);
            };
        }, [checkControls]);

        /** Обработчик клика по кнопке "Назад". */
        const handleMovePrev = (): void => {
            const {current: carousel} = carouselRef;

            if (carousel) {
                scrollSmoothHorizontally(carousel, Math.floor(-stepPrev));
            }
        };

        /** Обработчик клика по кнопке "Вперёд". */
        const handleMoveNext = (): void => {
            const {current: carousel} = carouselRef;

            if (carousel) {
                scrollSmoothHorizontally(carousel, Math.ceil(stepNext));
            }
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
                {buttonPrev({onClick: handleMovePrev, disabled: buttonPrevDisabled, hidden: controlsHidden})}
                <div className="cssClass[carouselExtended]" onScroll={checkControls} ref={setRef}>
                    {children}
                </div>
                {buttonNext({onClick: handleMoveNext, disabled: buttonNextDisabled, hidden: controlsHidden})}
            </div>
        );
    }
);

CarouselExtended.displayName = 'CarouselExtended';
