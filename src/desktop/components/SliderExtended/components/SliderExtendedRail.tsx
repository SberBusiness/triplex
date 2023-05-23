import * as React from 'react';
import {useContext} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {SliderExtendedContext} from '../SliderExtendedContext';
import {SliderExtendedUtils} from '../SliderExtendedUtils';

export interface ISliderExtendedRailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
    children?: never;
}

/**
 * Компонент полосы SliderExtended.
 */
export const SliderExtendedRail: React.FC<ISliderExtendedRailProps> = ({className, ...htmlDivAttributes}) => {
    const {dots, railNode, reverse, setRailNode, steps} = useContext(SliderExtendedContext);

    const onRailRefChange = (node: HTMLDivElement) => {
        setRailNode(node);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (railNode) {
            let normalizedValue = SliderExtendedUtils.getNormalizedCursorValue({
                cursorXPosition: event.clientX,
                railNode,
            });

            if (reverse) {
                normalizedValue = 100 - normalizedValue;
            }

            // Ближайшая точка на полосе.
            const nearestStep = SliderExtendedUtils.getNearestStep({normalizedValue, steps});
            // Ближайший Dot.
            const nearestDot = SliderExtendedUtils.getNearestDotByValue({dots, value: nearestStep.value});

            nearestDot.changeValue(nearestStep.value);
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
            ref={onRailRefChange}
            className={classnames('cssClass[sliderExtendedRail]', className)}
            onClick={handleClick}
            {...htmlDivAttributes}
        />
    );
};

SliderExtendedRail.displayName = 'SliderExtendedRail';
