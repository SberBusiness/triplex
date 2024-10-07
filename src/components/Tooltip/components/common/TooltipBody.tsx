import React from 'react';

/** Свойства компонента TooltipBody. */
export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело компонента Tooltip. */
export const TooltipBody = React.forwardRef<HTMLDivElement, ITooltipBodyProps>((props, ref) => <div {...props} ref={ref} />);

TooltipBody.displayName = 'TooltipBody';
