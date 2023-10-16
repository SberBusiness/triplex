import React from 'react';
import {SliderExtended} from '@sberbusiness/triplex/components/SliderExtended/SliderExtended';

interface ISliderExtendedRangeExampleProps {
    disabled: boolean;
}
export const SliderExtendedRangeExample: React.FC<ISliderExtendedRangeExampleProps> = ({disabled}) => {
    const [value1, setValue1] = React.useState(35)
    const [value2, setValue2] = React.useState(60)

    return(
        <SliderExtended
            disabled={disabled}
            min={0}
            max={100}
            step={1}
        >
            <SliderExtended.Rail />
            <SliderExtended.Dot value={value1} onChange={setValue1} />
            <SliderExtended.Track />
            <SliderExtended.Dot value={value2} onChange={setValue2} />
            <SliderExtended.Marks>
                <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
            </SliderExtended.Marks>
        </SliderExtended>
    );
};
