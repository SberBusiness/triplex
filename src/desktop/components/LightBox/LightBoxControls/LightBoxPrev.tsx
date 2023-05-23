import {LightboxpaginatorleftNavIcon64} from '@sberbusiness/icons/LightboxpaginatorleftNavIcon64';
import {PaginatorleftNavIcon32} from '@sberbusiness/icons/PaginatorleftNavIcon32';
import {CaretleftSrvxIcon24} from '@sberbusiness/icons/CaretleftSrvxIcon24';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';
import * as React from 'react';
import {MobileView} from '@sberbusiness/triplex/desktop/components/MobileView/MobileView';

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

export const LightBoxPrev: React.FC<ILightBoxPrevProps> = ({
    className,
    clickByArrowLeft,
    dataTutorialId,
    onClick,
    title,
    ...htmlDivAttributes
}) => {
    /**
     * Рендерит кнопку.
     * @param addDataTestId - Флаг, добавляющий data-test-id. Нужен, чтобы data-test-id не дублировался несколько раз на странице.
     */
    const renderButton = (addDataTestId: boolean) => (
        <ButtonIcon
            data-test-id={addDataTestId ? 'lightBox-prev' : undefined}
            data-tutorial-id={dataTutorialId}
            onClick={onClick}
            title={title}
            shape={EButtonIconShape.CIRCLE}
        >
            {/* Большая стрелка слева от LightBox. */}
            <span className="cssClass[lightBoxControlsBig]">
                <LightboxpaginatorleftNavIcon64 />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className="cssClass[lightBoxControlsSmall]">
                <MobileView fallback={<PaginatorleftNavIcon32 />}>
                    <CaretleftSrvxIcon24 />
                </MobileView>
            </span>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, 'cssClass[lightBoxPrev]')} {...htmlDivAttributes}>
            {clickByArrowLeft ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className="cssClass[withKeyboardEvent]">
                        <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ARROW_LEFT}>
                            {renderButton(true)}
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт
                         SideOverlay. */}
                    <span className="cssClass[withoutKeyboardEvent]">{renderButton(false)}</span>
                </span>
            ) : (
                renderButton(true)
            )}
        </div>
    );
};

LightBoxPrev.displayName = 'LightBoxPrev';
