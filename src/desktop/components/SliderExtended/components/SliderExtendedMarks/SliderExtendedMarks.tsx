import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

export interface ISliderExtendedMarksProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SliderExtendedMarks.
 */
export const SliderExtendedMarks: React.FC<ISliderExtendedMarksProps> = ({className, ...htmlDivAttributes}) => (
    <div className={classnames('cssClass[sliderExtendedMarks]', className)} {...htmlDivAttributes} />
);

SliderExtendedMarks.displayName = 'SliderExtendedMarks';
