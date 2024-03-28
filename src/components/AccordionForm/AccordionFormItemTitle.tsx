import React from 'react';

/** Свойства компонента AccordionFormItemTitle. */
export interface IAccordionFormItemTitleProps {
    children?: React.ReactNode;
}

/** Компонент заголовка элемента аккордеона. */
export const AccordionFormItemTitle: React.FC<IAccordionFormItemTitleProps> = ({children}) => (
    <div className="cssClass[title]">{children}</div>
);

AccordionFormItemTitle.displayName = 'AccordionFormItemTitle';
