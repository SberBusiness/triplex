import React from 'react';
import {TTooltipToggleType, ITooltipElements} from '@sberbusiness/triplex/components/Tooltip/types';

/** Свойства контекста Tooltip. */
export interface ITooltipContext {
    toggleType?: TTooltipToggleType;
    elements: ITooltipElements;
    tooltipOpen: boolean;
    tooltipHoveredRef: React.MutableRefObject<boolean>;
    setTooltipOpen: (open: boolean) => void;
}

/** Контекст компонента Tooltip. */
export const TooltipContext = React.createContext<ITooltipContext>({
    elements: {
        target: null,
        body: null,
        closeButton: null,
        mobileHeader: null,
    },
    tooltipOpen: false,
    tooltipHoveredRef: {current: false},
    setTooltipOpen: () => {},
});
