import React, {useEffect} from 'react';
import {findFirstInteractiveElement} from '@sberbusiness/triplex/components/ModalFocusManager/utils';

interface IModalFocusOnMountProps {
    children: React.ReactNode;
    // FocusManager не активен.
    disabled?: boolean;
}

/** Компонент, устанавливающий фокус внутри области на первый интерактивный элемент. */
export const ModalFocusOnMount: React.FC<IModalFocusOnMountProps> = ({children, disabled}) => {
    const refRootEl = React.useRef<HTMLDivElement | null>(null);

    // Фокус устанавливается на DidMount, либо когда disabled меняется с true на false.
    useEffect(() => {
        const {current: rootEl} = refRootEl;

        if (!rootEl || disabled) {
            return;
        }

        const exclude = (element: HTMLElement) => element.hasAttribute('data-exclude-modal-focus');

        const firstInteractiveElement = findFirstInteractiveElement(rootEl, exclude);

        if (firstInteractiveElement) {
            // На LightBox с Tabs почему-то фокус не навешивается без timeout.
            setTimeout(() => firstInteractiveElement?.focus({preventScroll: true}));
        }
    }, [disabled]);

    return (
        <div ref={refRootEl} data-exclude-modal-focus={true}>
            {children}
        </div>
    );
};
