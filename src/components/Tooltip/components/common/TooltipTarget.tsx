import React, {useContext} from 'react';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента TooltipTarget. */
export interface ITooltipTargetProps {
    /** Дочерние элементы. */
    children: React.ReactElement;
}

/** Целевой элемент компонента Tooltip. */
export const TooltipTarget: React.FC<ITooltipTargetProps> = ({children}) => {
    const {toggleType, tooltipOpen, tooltipHoveredRef, setTooltipOpen} = useContext(TooltipContext);
    const child = React.Children.only(children);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (onKeyDown?: React.KeyboardEventHandler) => (event: React.KeyboardEvent) => {
        const key = event.code || event.keyCode;

        if (isKey(key, 'TAB')) {
            if (tooltipOpen) {
                setTooltipOpen(false);
            }
        }
        onKeyDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (onClick?: React.MouseEventHandler) => (event: React.MouseEvent) => {
        if (toggleType === 'click' || (toggleType === 'hover' && !tooltipHoveredRef.current)) {
            setTooltipOpen(!tooltipOpen);
        }
        onClick?.(event);
    };

    if (React.isValidElement<React.HTMLAttributes<Element>>(child)) {
        return React.cloneElement(child, {
            onKeyDown: handleKeyDown(child.props.onKeyDown),
            onClick: handleClick(child.props.onClick),
        });
    }

    return child;
};
