import React from 'react';
import {ClosemediumNavIcon20} from '@sberbusiness/icons/ClosemediumNavIcon20';
import {CloselargeNavIcon32} from '@sberbusiness/icons/CloselargeNavIcon32';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TriggerClickOnKeyDownEvent} from '@sberbusiness/triplex/components/Triggers/TriggerClickOnKeyDownEvent';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';

/** Свойства LightBoxClose. */
interface ILightBoxCloseProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Обработчик закрытия лайтбокса. */
    onClick: () => void;
}

/** Кнопка закрытия лайтбокса. */
export const LightBoxClose: React.FC<ILightBoxCloseProps> = ({className, onClick, title = 'Закрыть', ...htmlDivAttributes}) => {
    const renderButton = () => (
        <ButtonIcon onClick={onClick} title={title} data-exclude-modal-focus>
            <MobileView fallback={<CloselargeNavIcon32 />}>
                <ClosemediumNavIcon20 />
            </MobileView>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, 'cssClass[lightBoxClose]')} {...htmlDivAttributes}>
            {/* Кнопка с триггером по Esc. */}
            <span className="cssClass[withKeyboardEvent]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE}>{renderButton()}</TriggerClickOnKeyDownEvent>
            </span>

            {/* Кнопка без триггера по Esc. Отображается, когда открыт SideOverlay. */}
            <span className="cssClass[withoutKeyboardEvent]">{renderButton()}</span>
        </div>
    );
};

LightBoxClose.displayName = 'LightBoxClose';
