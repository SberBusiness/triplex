import React from 'react';
import {ETooltipDirection} from '@sberbusiness/triplex/components/Tooltip/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TooltipDesktopTip. */
interface ITooltipDesktopTipProps {
    /** Направление, на которое смотрит указатель "стрелочки" (треугольника). */
    direction: ETooltipDirection;
    /** Дочерние элементы. */
    children?: never;
}

/** Компонент "стрелочка" (треугольник) Tooltip'а. */
export const TooltipDesktopTip = React.forwardRef<HTMLDivElement, ITooltipDesktopTipProps>((props, ref) => {
    const {direction} = props;

    let directionClass;

    switch (direction) {
        case ETooltipDirection.UP:
            directionClass = 'cssClass[up]';
            break;
        case ETooltipDirection.DOWN:
            directionClass = 'cssClass[down]';
            break;
        case ETooltipDirection.LEFT:
            directionClass = 'cssClass[left]';
            break;
        case ETooltipDirection.RIGHT:
            directionClass = 'cssClass[right]';
            break;
    }

    return <div className={classnames('cssClass[tooltipDesktopTip]', directionClass)} ref={ref} />;
});

TooltipDesktopTip.displayName = 'TooltipDesktopTip';
