import React from 'react';

/** Свойства компонента TooltipBody. */
export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    forwardedRef?: React.RefObject<HTMLDivElement>;
}

/** Тело компонента Tooltip. */
export const TooltipBody: React.FC<ITooltipBodyProps> = ({children, forwardedRef, ...htmlAttrs}) => (
    <div ref={forwardedRef} {...htmlAttrs}>
        {children}
    </div>
);

TooltipBody.displayName = 'TooltipBody';
