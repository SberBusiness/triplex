import * as React from 'react';

interface IWidgetFooterContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetFooterContent: React.FC<IWidgetFooterContentProps> = ({children, ...htmlDivAttributes}) => (
    <div {...htmlDivAttributes} className="cssClass[widgetFooterContent]">
        {children}
    </div>
);

WidgetFooterContent.displayName = 'WidgetFooterContent';
