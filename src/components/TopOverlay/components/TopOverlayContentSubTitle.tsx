import React from 'react';

/**
 * Свойства компонента.
 */
export interface ITopOverlayContentSubTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: string;
}

/**
 * Компонент подзаголовка блока с контентом.
 */
export const TopOverlayContentSubTitle: React.FC<ITopOverlayContentSubTitleProps> = ({children, ...divHTMLAttributes}) => (
    <div data-test-id="confirm__confirmSubtitle" {...divHTMLAttributes} className="cssClass[topOverlaySubTitle]">
        {children}
    </div>
);

TopOverlayContentSubTitle.displayName = 'TopOverlayContentSubTitle';
