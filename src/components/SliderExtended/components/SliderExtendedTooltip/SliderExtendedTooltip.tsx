import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SliderExtendedContext} from '../../SliderExtendedContext';

/** Свойства компонента SliderExtendedTooltip. */
export interface ISliderExtendedTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
}

export const SliderExtendedTooltip: React.FC<ISliderExtendedTooltipProps> = ({value, children, ...htmlAttributes}) => {
    const tooltipContentRef = React.useRef<HTMLDivElement>(null);
    const {min, max} = React.useContext(SliderExtendedContext);

    const calculateOffset = () => {
        if (!tooltipContentRef.current || value === undefined) {
            return 0;
        }

        const tipHalfWidth = 8;
        const offsetFromSide = 16;
        const contentWidth = tooltipContentRef.current.clientWidth;
        const normalizedValue = (value - min) / (max - min);

        return (contentWidth / 2 - tipHalfWidth - offsetFromSide) * (1 - 2 * normalizedValue);
    };

    return (
        <div ref={tooltipContentRef} className={'cssClass[sliderExtendedTooltipOverlay]'} {...htmlAttributes}>
            <div className={'cssClass[tooltipBody]'} style={{left: `${calculateOffset()}px`}}>
                {children}
            </div>
            <div className={classnames('cssClass[tooltipTip]')} />
        </div>
    );
};
