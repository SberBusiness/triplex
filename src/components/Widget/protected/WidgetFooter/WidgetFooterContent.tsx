import React from 'react';

/** Свойства компонента WidgetFooterContent. */
interface IWidgetFooterContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetFooterContent: React.FC<IWidgetFooterContentProps> = ({children, ...htmlDivAttributes}) => (
    <div {...htmlDivAttributes} className="cssClass[widgetFooterContent]">
        {children}
    </div>
);

WidgetFooterContent.displayName = 'WidgetFooterContent';
