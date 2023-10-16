import React, {useEffect} from 'react';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {isIE} from '@sberbusiness/triplex/utils/userAgentUtils';

/**
 * Свойства MediaMinWidth.
 */
interface IMediaMinWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера соответствует значению minWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экран, при которой будут отрендерены children. */
    minWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера соответствует значению minWidth.
 * В противном случае рендерится fallback.
 */
export const MediaMinWidth: React.FC<IMediaMinWidthProps> = ({children, fallback, minWidth}) => {
    const [matches, setMatches] = React.useState(window.innerWidth > parseInt(minWidth));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(min-width: ${minWidth})`);
        const handleChangeMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

        if (isIE) {
            mediaQueryList.addListener(handleChangeMatches);
        } else {
            mediaQueryList.addEventListener('change', handleChangeMatches);
        }

        return () => {
            if (isIE) {
                mediaQueryList.removeListener(handleChangeMatches);
            } else {
                mediaQueryList.removeEventListener('change', handleChangeMatches);
            }
        };
    }, [minWidth]);

    return matches ? children : fallback;
};
