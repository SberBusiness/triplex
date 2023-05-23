import * as React from 'react';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';

/**
 * Свойства CheckboxTreeExtendedArrow.
 *
 * @prop {boolean} active - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} opened - Текущая нода раскрыта.
 * @prop {Function} toggle - Функция смены значения opened.
 */
interface ICheckboxTreeExtendedArrowProps {
    active: boolean;
    opened: boolean;
    toggle: (opened: boolean) => void;
}

/**
 * Стрелка раскрытия ветки CheckboxTreeExtended.
 */
export class CheckboxTreeExtendedArrow extends React.Component<ICheckboxTreeExtendedArrowProps> {
    private arrowNode?: HTMLSpanElement;

    public componentDidUpdate(prevProps: ICheckboxTreeExtendedArrowProps): void {
        const {active} = this.props;
        const {active: prevActive} = prevProps;

        // Триггер фокуса на стрелке при изменения флага активности при перемещении по дереву с клавиатуры.
        if (active && !prevActive) {
            this.arrowNode?.focus();
        }
    }

    public render(): JSX.Element {
        return (
            <span
                className="cssClass[caretIconWrapper]"
                onClick={this.handleClick}
                onKeyUp={this.handleKeyUp}
                ref={this.setArrowNode}
                role="button"
                tabIndex={-1}
            >
                <CaretdownSrvxIcon16 />
            </span>
        );
    }

    private setArrowNode = (DOMNode: HTMLSpanElement) => {
        this.arrowNode = DOMNode;
    };

    private handleClick = () => {
        const {opened, toggle} = this.props;

        toggle(!opened);
    };

    /**
     * Обработчик нажатия клавиш.
     * Стрелка вправо - раскрыть, влево - свернуть.
     * Enter, space - изменить состояние на противоположное.
     */
    private handleKeyUp = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        const {opened, toggle} = this.props;

        if (event.keyCode === EVENT_KEY_CODES.ARROW_RIGHT) {
            toggle(true);
        } else if (event.keyCode === EVENT_KEY_CODES.ARROW_LEFT) {
            toggle(false);
        } else if ([EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.SPACE].includes(event.keyCode)) {
            toggle(!opened);
        }
    };
}
