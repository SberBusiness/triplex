import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ETooltipDirection} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {isIE} from '@sberbusiness/triplex/desktop/utils/userAgentUtils';
import * as React from 'react';

/**
 * @prop {EDirection} direction Направление, на которое смотрит указатель "стрелочки" (треугольника).
 */
interface IProps {
    direction: ETooltipDirection;
}

/**
 * Компонент "стрелочка" (треугольник) Tooltip'а.
 */
export const Tip = (props: IProps) => {
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
    // класс ieHack нужен чтобы убрать небольшое расстояние между тултипом и стрелочкой в IE
    return <div className={classnames('cssClass[tip]', directionClass, 'js-tip', isIE ? 'cssClass[ieHack]' : '')} />;
};
