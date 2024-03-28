import React from 'react';

/** Свойства компонента AlertProcessHeader. */
export interface IAlertProcessHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Заголовок компонента AlertProcess. */
export const AlertProcessHeader: React.FC<IAlertProcessHeaderProps> = ({children, ...htmlAttributes}) => (
    <div {...htmlAttributes} className="cssClass[alertProcessContentHeader]">
        {children}
    </div>
);

AlertProcessHeader.displayName = 'AlertProcessHeader';
