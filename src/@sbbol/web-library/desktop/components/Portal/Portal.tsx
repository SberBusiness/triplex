import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IPortalProps {
    children: React.ReactElement;
    node: Element;
}

/**
 * Компонент портал, для рендера элемента во внешний DOM узел.
 */
export const Portal: React.FC<IPortalProps> = ({children, node}) => ReactDOM.createPortal(children, node);
