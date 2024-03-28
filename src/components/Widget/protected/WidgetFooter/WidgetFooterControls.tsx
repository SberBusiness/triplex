import React from 'react';

/** Свойства компонента WidgetFooterControls. */
interface IWidgetFooterControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetFooterControls: React.FC<IWidgetFooterControlsProps> = ({children, ...htmlDivAttributes}) => (
    <div {...htmlDivAttributes} className="cssClass[widgetFooterControls]">
        {children}
    </div>
);

WidgetFooterControls.displayName = 'WidgetFooterControls';
