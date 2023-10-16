import React, {useEffect} from 'react';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {isIE} from '@sberbusiness/triplex/utils/userAgentUtils';

/**
 * Свойства MediaMaxWidth.
 */
interface IMediaMaxWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера соответствует значению maxWidth. */
    children: React.ReactElement | null;
    /** Максимальная ширина экран, при которой будут отрендерены children. */
    maxWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера соответствует значению maxWidth.
 * В противном случае рендерится fallback.
 */
export const MediaMaxWidth: React.FC<IMediaMaxWidthProps> = ({children, fallback, maxWidth}) => {
    const [matches, setMatches] = React.useState(window.innerWidth < parseInt(maxWidth));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${maxWidth})`);
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
    }, [maxWidth]);

    return matches ? children : fallback;
};
