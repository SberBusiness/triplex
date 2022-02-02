import * as React from 'react';
import {CloselargeNavIcon32} from '@sberbusiness/icons/CloselargeNavIcon32';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';

/**
 * Свойства компонента кнопки закрытия лайтбокса.
 *
 * @prop {Function} onClick Обработчик закрытия лайтбокса.
 */
interface ILightBoxCloseProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick: () => void;
}

/**
 * Компонент кнопки закрытия лайтбокса.
 */
export class LightBoxClose extends React.Component<ILightBoxCloseProps> {
    public static displayName = 'LightBoxClose';

    public render(): JSX.Element {
        const button = this.renderButton();
        const {className, onClick, title, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[lightBoxClose]')} {...htmlDivAttributes}>
                {/* Кнопка с триггером по Esc. */}
                <span className="cssClass[lightBoxControlsWithTriggerOnKeyboardEvent]">
                    <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESC}>{button}</TriggerClickOnKeyDownEvent>
                </span>

                {/* Кнопка без триггера по Esc. Отображается, когда открыт SideOverlay. */}
                <span className="cssClass[lightBoxControlsWithoutTriggerOnKeyboardEvent]">{button}</span>
            </div>
        );
    }

    private renderButton = () => (
        <ButtonIcon onClick={this.props.onClick} title={this.props.title}>
            <CloselargeNavIcon32 />
        </ButtonIcon>
    );
}
