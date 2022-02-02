import {LightboxpaginatorrightNavIcon64} from '@sberbusiness/icons/LightboxpaginatorrightNavIcon64';
import {PaginatorrightNavIcon32} from '@sberbusiness/icons/PaginatorrightNavIcon32';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sbbol/web-library/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import * as React from 'react';

/**
 * Свойства LightBoxNext.
 *
 * @prop {boolean} [clickByArrowRight] - Кликнуть по кнопке при нажатии стрелки вправо на клавиатуре.
 * @prop {Function} onClick Обработчик клика по кнопке.
 * @prop {string} dataTutorialId.
 */
interface ILightBoxNextProps extends React.HTMLAttributes<HTMLDivElement> {
    clickByArrowRight?: boolean;
    onClick: () => void;
    dataTutorialId?: string;
}

/**
 * Стрелка Next.
 */
export class LightBoxNext extends React.Component<ILightBoxNextProps> {
    public static displayName = 'LightBoxNext';

    public render(): JSX.Element {
        const {className, clickByArrowRight, dataTutorialId, onClick, title, ...htmlDivAttributes} = this.props;
        const button = this.renderButton();

        return (
            <div className={classnames(className, 'cssClass[lightBoxNext]')} {...htmlDivAttributes}>
                {clickByArrowRight ? (
                    <span>
                        {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                        <span className="cssClass[lightBoxControlsWithTriggerOnKeyboardEvent]">
                            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ARROW_RIGHT}>{button}</TriggerClickOnKeyDownEvent>
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
            <ButtonIcon data-test-id="lightBox-next" data-tutorial-id={dataTutorialId} onClick={onClick} title={title}>
                <span className="cssClass[lightBoxControlsBig]">
                    <LightboxpaginatorrightNavIcon64 />
                </span>
                <span className="cssClass[lightBoxControlsSmall]">
                    <PaginatorrightNavIcon32 />
                </span>
            </ButtonIcon>
        );
    };
}
