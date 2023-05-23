import {IKeyDownListenerProps, KeyDownListener} from '@sberbusiness/triplex/desktop/components/KeyDownListener/KeyDownListener';
import * as React from 'react';

/**
 * Свойства компонента ComposedKeyDownListener.
 *
 * @prop {IKeyDownListenerProps[]} keyDownListeners Массив-конфигуратор keydown слушателей.
 */
interface IKeyDownListenerManagerProps {
    keyDownListeners: IKeyDownListenerProps[];
}

/** Композитор слушателей нажатия клавиш. */
export const ComposedKeyDownListener: React.FC<IKeyDownListenerManagerProps> = ({keyDownListeners, children}) => {
    let accumulatedElement = children as JSX.Element;

    if (keyDownListeners.length) {
        for (let i = 0; i < keyDownListeners.length; i++) {
            accumulatedElement = (
                <KeyDownListener onMatch={keyDownListeners[i].onMatch} eventKeyCode={keyDownListeners[i].eventKeyCode}>
                    {accumulatedElement}
                </KeyDownListener>
            );
        }
    }

    return accumulatedElement;
};
