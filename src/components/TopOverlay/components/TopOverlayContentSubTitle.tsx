import React from 'react';

/** Свойства компонента TopOverlayContentSubTitle. */
export interface ITopOverlayContentSubTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент подзаголовка блока с контентом. */
export const TopOverlayContentSubTitle: React.FC<ITopOverlayContentSubTitleProps> = ({children, ...divHTMLAttributes}) => (
    <div data-test-id="confirm__confirmSubtitle" {...divHTMLAttributes} className="cssClass[topOverlaySubTitle]">
        {children}
    </div>
);

TopOverlayContentSubTitle.displayName = 'TopOverlayContentSubTitle';
