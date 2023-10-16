import React, {useEffect} from 'react';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {isIE} from '@sberbusiness/triplex/utils/userAgentUtils';

/**
 * Свойства MediaBetweenWidth.
 */
interface IMediaBetweenWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экран, при которой будут отрендерены children. */
    minWidth: EScreenWidth;
    /** Максимальная ширина экран, при которой будут отрендерены children. */
    maxWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера попадает в диапазон между minWidth и maxWidth.
 * В противном случае рендерится fallback.
 */
export const MediaBetweenWidth: React.FC<IMediaBetweenWidthProps> = ({children, fallback, minWidth, maxWidth}) => {
    const [matches, setMatches] = React.useState(window.innerWidth > parseInt(minWidth) && window.innerWidth < parseInt(maxWidth));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${maxWidth}) and (min-width: ${minWidth}`);
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
    }, [maxWidth, minWidth]);

    return matches ? children : fallback;
};
