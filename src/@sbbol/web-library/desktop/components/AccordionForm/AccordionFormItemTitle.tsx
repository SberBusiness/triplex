import * as React from 'react';

/**
 * Компонент заголовка элемента аккордеона.
 */
const AccordionFormItemTitle: React.FC = (props) => <div className="cssClass[title]">{props.children}</div>;

AccordionFormItemTitle.displayName = 'AccordionFormItemTitle';

export {AccordionFormItemTitle};
