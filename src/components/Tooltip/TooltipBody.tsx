import React from 'react';

export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    forwardedRef?: React.RefObject<HTMLDivElement>;
}

export const TooltipBody: React.FC<ITooltipBodyProps> = ({children, forwardedRef, ...htmlAttrs}) => (
    <div ref={forwardedRef} {...htmlAttrs}>
        {children}
    </div>
);

TooltipBody.displayName = 'TooltipBody';
