import * as React from 'react';

export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TooltipBody: React.FC<ITooltipBodyProps> = ({children, ...htmlAttrs}) => <div {...htmlAttrs}>{children}</div>;

TooltipBody.displayName = 'TooltipBody';
