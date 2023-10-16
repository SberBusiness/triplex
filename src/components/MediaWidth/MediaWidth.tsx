import React from 'react';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';
import {MediaMaxWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaMaxWidth';
import {MediaMinWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaMinWidth';
import {MediaBetweenWidth} from '@sberbusiness/triplex/components/MediaWidth/MediaBetweenWidth';

/**
 * Свойства MediaWidth.
 */
interface IMediaProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экран, при которой будут отрендерены children. */
    minWidth?: EScreenWidth;
    /** Максимальная ширина экран, при которой будут отрендерены children. */
    maxWidth?: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит элементы в зависимости от ширины окна браузера.
 */
export const MediaWidth: React.FC<IMediaProps> = ({children, fallback, maxWidth, minWidth}) => {
    if (minWidth && maxWidth) {
        return (
            <MediaBetweenWidth minWidth={minWidth} maxWidth={maxWidth} fallback={fallback}>
                {children}
            </MediaBetweenWidth>
        );
    } else if (minWidth) {
        return (
            <MediaMinWidth minWidth={minWidth} fallback={fallback}>
                {children}
            </MediaMinWidth>
        );
    } else if (maxWidth) {
        return (
            <MediaMaxWidth maxWidth={maxWidth} fallback={fallback}>
                {children}
            </MediaMaxWidth>
        );
    }

    return fallback;
};
