import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {SpinnerWidget} from '@sbbol/web-library/desktop/components/SpinnerWidget/SpinnerWidget';

export const LightBoxSideOverlayLoader: React.FC = () => {
    // Позиция top, высчитывается из scrollTop родителя.
    const [topPosition, setTopPosition] = useState<number | string>(0);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loaderRef.current) {
            const position = loaderRef.current.getBoundingClientRect();
            // position.top равен высоте скролла родителя.
            if (position.top !== topPosition) {
                setTopPosition(Math.abs(position.top));
            }
        }
    }, []);

    return (
        <div ref={loaderRef} className="cssClass[spinnerWrapper]" style={{top: `${topPosition}px`}}>
            <SpinnerWidget />
        </div>
    );
};
