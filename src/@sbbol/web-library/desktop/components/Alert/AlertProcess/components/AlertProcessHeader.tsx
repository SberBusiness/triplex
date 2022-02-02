import * as React from 'react';

/**
 * Интерфейс компонента AlertProcessHeader.
 */
export interface IAlertProcessHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactText;
}

/**
 * Компонент заголовка AlertProcessHeader компонента AlertProcess.
 */
export const AlertProcessHeader: React.FC<IAlertProcessHeaderProps> = ({children, ...htmlAttributes}) => (
    <div {...htmlAttributes} className="cssClass[alertProcessContentHeader]">
        {children}
    </div>
);

AlertProcessHeader.displayName = 'AlertProcessHeader';
