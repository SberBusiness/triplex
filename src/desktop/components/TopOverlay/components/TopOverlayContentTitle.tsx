import * as React from 'react';

/**
 * Свойства компонента.
 */
export interface ITopOverlayContentTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: string;
}

/**
 * Компонент заголовка блока с контентом.
 */
export const TopOverlayContentTitle: React.FC<ITopOverlayContentTitleProps> = ({children, ...divHTMLAttributes}) => (
    <div {...divHTMLAttributes} className="cssClass[globalTopOverlayTitle]">
        {children}
    </div>
);

TopOverlayContentTitle.displayName = 'TopOverlayContentTitle';
