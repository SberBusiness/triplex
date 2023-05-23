import {LightboxpaginatorrightNavIcon64} from '@sberbusiness/icons/LightboxpaginatorrightNavIcon64';
import {PaginatorrightNavIcon32} from '@sberbusiness/icons/PaginatorrightNavIcon32';
import {CaretrightSrvxIcon24} from '@sberbusiness/icons/CaretrightSrvxIcon24';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/desktop/components/Triggers/TriggerClickOnKeyDownEvent';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';
import * as React from 'react';
import {MobileView} from '@sberbusiness/triplex/desktop/components/MobileView/MobileView';

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
export const LightBoxNext: React.FC<ILightBoxNextProps> = ({
    className,
    clickByArrowRight,
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
            data-test-id={addDataTestId ? 'lightBox-next' : undefined}
            data-tutorial-id={dataTutorialId}
            onClick={onClick}
            title={title}
            shape={EButtonIconShape.CIRCLE}
        >
            {/* Большая стрелка справа от LightBox. */}
            <span className="cssClass[lightBoxControlsBig]">
                <LightboxpaginatorrightNavIcon64 />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className="cssClass[lightBoxControlsSmall]">
                <MobileView fallback={<PaginatorrightNavIcon32 />}>
                    <CaretrightSrvxIcon24 />
                </MobileView>
            </span>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, 'cssClass[lightBoxNext]')} {...htmlDivAttributes}>
            {clickByArrowRight ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className="cssClass[withKeyboardEvent]">
                        <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ARROW_RIGHT}>
                            {renderButton(true)}
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт SideOverlay. */}
                    <span className="cssClass[withoutKeyboardEvent]">{renderButton(false)}</span>
                </span>
            ) : (
                renderButton(true)
            )}
        </div>
    );
};

LightBoxNext.displayName = 'LightBoxNext';
