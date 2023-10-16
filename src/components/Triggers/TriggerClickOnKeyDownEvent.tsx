import {IKeyDownListenerProps, KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Свойства TriggerClickOnKeyDownEvent.
 */
interface ITriggerClickOnKeyDownEventProps extends Pick<IKeyDownListenerProps, 'eventKeyCode'> {
    children: React.ReactElement;
}

/**
 * Вызывает onClick на чилда, при нажатии на клавишу.
 */
export class TriggerClickOnKeyDownEvent extends React.Component<ITriggerClickOnKeyDownEventProps> {
    public static displayName = 'TriggerClickOnKeyDownEvent';

    public render() {
        const {children, eventKeyCode} = this.props;

        return (
            <KeyDownListener onMatch={this.handleKeyDown} eventKeyCode={eventKeyCode}>
                {children}
            </KeyDownListener>
        );
    }

    private handleKeyDown = () => {
        const node = ReactDOM.findDOMNode(this);
        /**
         * Node не null и она не имеет свойства display: none, иначе происходит триггер на скрытых элементах.
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
         */
        if (node && (node as HTMLButtonElement).offsetParent !== null) {
            (node as HTMLButtonElement).click();
        }
    };
}
