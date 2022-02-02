import * as React from 'react';

export const TooltipBody: React.FC = ({children, ...htmlAttrs}) => <span {...htmlAttrs}>{children}</span>;
TooltipBody.displayName = 'TooltipBody';
