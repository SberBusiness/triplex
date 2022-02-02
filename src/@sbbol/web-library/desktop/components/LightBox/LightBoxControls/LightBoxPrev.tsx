import {LightboxpaginatorleftNavIcon64} from '@sberbusiness/icons/LightboxpaginatorleftNavIcon64';
import {PaginatorleftNavIcon32} from '@sberbusiness/icons/PaginatorleftNavIcon32';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import * as React from 'react';

/**
 * Свойства LightBoxPrev.
 *
 * @prop {boolean} [clickByArrowLeft] - Кликнуть по кнопке при нажатии стрелки влево на клавиатуре.
 * @prop {Function} onClick Обработчик клика по кнопке.
 * @prop {string} dataTutorialId.
 */
interface ILightBoxPrevProps extends React.HTMLAttributes<HTMLDivElement> {
    clickByArrowLeft?: boolean;
    onClick: () => void;
    dataTutorialId?: string;
}

export class LightBoxPrev extends React.Component<ILightBoxPrevProps> {
    public static displayName = 'LightBoxPrev';

    public render(): JSX.Element {
        const {className, clickByArrowLeft, dataTutorialId, onClick, title, ...htmlDivAttributes} = this.props;
        const button = this.renderButton();

        return (
            <div className={classnames(className, 'cssClass[lightBoxPrev]')} {...htmlDivAttributes}>
                {clickByArrowLeft ? (
                    <span>
                        {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                        <span className="cssClass[lightBoxControlsWithTriggerOnKeyboardEvent]">
                            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ARROW_LEFT}>{button}</TriggerClickOnKeyDownEvent>
                        </span>
                        {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт
                         SideOverlay. */}
                        <span className="cssClass[lightBoxControlsWithoutTriggerOnKeyboardEvent]">{button}</span>
                    </span>
                ) : (
                    button
                )}
            </div>
        );
    }

    private renderButton = () => {
        const {onClick, dataTutorialId, title} = this.props;

        return (
            <ButtonIcon data-test-id="lightBox-prev" data-tutorial-id={dataTutorialId} onClick={onClick} title={title}>
                <span className="cssClass[lightBoxControlsBig]">
                    <LightboxpaginatorleftNavIcon64 />
                </span>
                <span className="cssClass[lightBoxControlsSmall]">
                    <PaginatorleftNavIcon32 />
                </span>
            </ButtonIcon>
        );
    };
}
