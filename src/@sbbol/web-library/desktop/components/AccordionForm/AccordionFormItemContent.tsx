import * as React from 'react';

/**
 * Компонент содержимого элемента аккордеона.
 */
const AccordionFormItemContent: React.FC = (props) => <div className="cssClass[content]">{props.children}</div>;

AccordionFormItemContent.displayName = 'AccordionFormItemContent';

export {AccordionFormItemContent};
