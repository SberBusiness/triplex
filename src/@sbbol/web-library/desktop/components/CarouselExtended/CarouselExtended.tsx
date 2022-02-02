import React, {useState, useRef, useEffect} from 'react';
import ReactResizeDetector from 'react-resize-detector/build/withPolyfill';
import {WindowResizeListener} from '@sbbol/web-library/common/components/WindowResizeListener/WindowResizeListener';

export interface ICarouselExtendedButtonProvideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ICarouselExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonPrev: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    buttonNext: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    // Значение сдвига контента при клике на стрелку карусели, в px;
    stepPrev: number;
    // Значение сдвига контента при клике на стрелку карусели, в px;
    stepNext: number;
}

export const CarouselExtended: React.FC<ICarouselExtendedProps> = ({
    children,
    buttonPrev,
    buttonNext,
    stepPrev,
    stepNext,
    ...htmlDivAttributes
}) => {
    const [offset, setOffset] = useState(0);
    const [controlsHidden, setControlsHidden] = useState(false);
    const [buttonPrevDisabled, setButtonPrevDisabled] = useState(false);
    const [buttonNextDisabled, setButtonNextDisabled] = useState(false);
    // В текущий момент карусель анимированно изменяет позицию.
    const [animating, setAnimating] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselInnerRef = useRef<HTMLDivElement>(null);

    const checkControls = () => {
        if (!carouselRef.current || !carouselInnerRef.current) {
            return;
        }

        const carouselPosition = carouselRef.current.getBoundingClientRect();
        const carouselInnerPosition = carouselInnerRef.current.getBoundingClientRect();

        setControlsHidden(carouselPosition.width > carouselInnerPosition.width);

        // (Firefox) С помощью ~~ (двойное побитовое НЕ) избавляемся от дробной части результата вычитания
        setButtonPrevDisabled(!~~(carouselPosition.left - carouselInnerPosition.left));
        setButtonNextDisabled(!~~(carouselInnerPosition.right - carouselPosition.right));
    };

    /** Проверяет корректность значения offset, он может быть неверным при перемещения фокуса с клавиатуры. */
    const checkOffset = () => {
        if (!carouselRef.current || !carouselInnerRef.current) {
            return;
        }

        const carouselPosition = carouselRef.current.getBoundingClientRect();
        const carouselInnerPosition = carouselInnerRef.current.getBoundingClientRect();
        const deltaLeft = carouselPosition.left - carouselInnerPosition.left;
        const deltaRight = carouselInnerPosition.right - carouselPosition.right;

        if (deltaLeft < 0) {
            setOffset((prevOffset) => prevOffset + deltaLeft);
        }

        if (deltaRight < 0) {
            setOffset((prevOffset) => prevOffset - deltaRight);
        }
    };

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        const {target, currentTarget} = event;

        if (target === currentTarget) {
            checkControls();
            // Окончание анимации изменения позиции.
            setAnimating(false);
        }
    };

    useEffect(() => {
        checkControls();
        setTimeout(() => setAnimating(false));
    }, []);

    useEffect(() => {
        // Начало анимации изменения позиции.
        setAnimating(true);
    }, [offset]);

    const handleClickPrevButton = () => {
        if (!carouselRef.current || !carouselInnerRef.current || animating) {
            return;
        }

        let nextOffset;
        const carouselLeftPosition = carouselRef.current.getBoundingClientRect().left;
        const carouselInnerLeftPosition = carouselInnerRef.current.getBoundingClientRect().left;
        const delta = carouselLeftPosition - carouselInnerLeftPosition;

        if (delta <= 0) {
            return;
        }

        if (delta > stepPrev) {
            nextOffset = offset + stepPrev;
        } else {
            nextOffset = offset + delta;
        }

        setOffset(nextOffset);
    };

    const handleClickNextButton = () => {
        if (!carouselRef.current || !carouselInnerRef.current || animating) {
            return;
        }

        let nextOffset;
        const carouselRightPosition = carouselRef.current.getBoundingClientRect().right;
        const carouselInnerRightPosition = carouselInnerRef.current.getBoundingClientRect().right;
        const delta = carouselInnerRightPosition - carouselRightPosition;

        if (delta <= 0) {
            return;
        }

        if (delta > stepNext) {
            nextOffset = offset - stepNext;
        } else {
            nextOffset = offset - delta;
        }

        setOffset(nextOffset);
    };

    const handleScroll = () => {
        checkOffset();
        checkControls();
    };

    const handleResize = () => {
        checkControls();
    };

    return (
        <div {...htmlDivAttributes}>
            {buttonPrev({onClick: handleClickPrevButton, disabled: buttonPrevDisabled, hidden: controlsHidden})}
            {buttonNext({onClick: handleClickNextButton, disabled: buttonNextDisabled, hidden: controlsHidden})}
            <div className="cssClass[carouselExtended]" onScroll={handleScroll} ref={carouselRef}>
                <div
                    className="cssClass[carouselExtendedInner]"
                    onTransitionEnd={handleTransitionEnd}
                    style={{transform: `translateX(${offset}px)`}}
                    ref={carouselInnerRef}
                >
                    {children}
                </div>
            </div>
            <WindowResizeListener onResize={handleResize} />
            <ReactResizeDetector
                targetRef={carouselInnerRef}
                onResize={handleResize}
                refreshMode="throttle"
                refreshRate={150}
                handleWidth
            />
        </div>
    );
};
