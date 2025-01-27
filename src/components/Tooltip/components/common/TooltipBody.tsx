import React from 'react';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TooltipBody. */
export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело компонента Tooltip. */
export const TooltipBody = React.forwardRef<HTMLDivElement, ITooltipBodyProps>(({className, ...rest}, ref) => {
    const classNames = classnames('cssClass[tooltipBody]', className);

    return (
        <MobileView fallback={<div className={classNames} {...rest} ref={ref} />}>
            <Text className={classNames} size={ETextSize.B1} line={ELineType.EXTRA} tag="div" {...rest} ref={ref} />
        </MobileView>
    );
});

TooltipBody.displayName = 'TooltipBody';
