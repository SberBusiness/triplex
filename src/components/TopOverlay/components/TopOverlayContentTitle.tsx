import React from 'react';

/** Свойства компонента TopOverlayContentTitle. */
export interface ITopOverlayContentTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент заголовка блока с контентом. */
export const TopOverlayContentTitle: React.FC<ITopOverlayContentTitleProps> = ({children, ...divHTMLAttributes}) => (
    <div {...divHTMLAttributes} className="cssClass[globalTopOverlayTitle]">
        {children}
    </div>
);

TopOverlayContentTitle.displayName = 'TopOverlayContentTitle';
