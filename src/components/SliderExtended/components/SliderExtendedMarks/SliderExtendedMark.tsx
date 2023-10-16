import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React from 'react';
import {SliderExtendedContext} from '../../SliderExtendedContext';
import {Text} from '../../../Typography/Text';
import {ETextSize} from '../../../Typography/enums';
import {SliderExtendedMarkActions} from './SliderExtendedMarkActions';

export interface ISliderExtendedMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: number;
}

/**
 * Компонент SliderExtendedMark.
 */
export const SliderExtendedMark: React.FC<ISliderExtendedMarkProps> = ({children, className, value, ...htmlSpanAttributes}) => {
    const {disabled, dots, min, max, reverse} = React.useContext(SliderExtendedContext);

    const handleClick = () => SliderExtendedMarkActions.moveNearestDot({value, dots});

    return (
        <span
            className={classnames('cssClass[sliderExtendedMark]', className, {
                // Одна из SliderExtended.Dot, находится на текущей позиции.
                'cssClass[active]': SliderExtendedMarkActions.isActive({value, dots}) && !disabled,
                'cssClass[disabled]': disabled,
                'cssClass[reverse]': reverse,
            })}
            {...htmlSpanAttributes}
            style={SliderExtendedMarkActions.getStyle({min, max, reverse, value})}
        >
            <span
                className={classnames('cssClass[sliderExtendedMarkDot]', {
                    'cssClass[inSelectedRange]': SliderExtendedMarkActions.isInSelectedRange({value, min, dots}),
                })}
                onClick={handleClick}
            />
            <Text className="cssClass[sliderExtendedMarkText]" size={ETextSize.B2} onClick={handleClick}>
                {children}
            </Text>
        </span>
    );
};

SliderExtendedMark.displayName = 'SliderExtendedMark';
