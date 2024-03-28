import React from 'react';

/** Свойства компонента AccordionFormItemContent. */
export interface IAccordionFormItemContentProps {
    children?: React.ReactNode;
}

/** Компонент содержимого элемента аккордеона. */
export const AccordionFormItemContent: React.FC<IAccordionFormItemContentProps> = ({children}) => <div className="cssClass[content]">{children}</div>;

AccordionFormItemContent.displayName = 'AccordionFormItemContent';
