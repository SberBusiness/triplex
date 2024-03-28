import React from 'react';

/** Свойства компонента AccordionFormItemFooter. */
export interface IAccordionFormItemFooterProps {
    children?: React.ReactNode;
}

/** Компонент подвала элемента акоордеона. */
export const AccordionFormItemFooter: React.FC<IAccordionFormItemFooterProps> = ({children}) => (
    <div className="cssClass[footer]">{children}</div>
);

AccordionFormItemFooter.displayName = 'AccordionFormItemFooter';
