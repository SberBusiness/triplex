import React, {useState, useEffect, useCallback, useRef} from 'react';
import FocusTrap from 'focus-trap-react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import {ITooltipProps} from '@sberbusiness/triplex/desktop/components/Tooltip/types';
import {TooltipTarget} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipTarget';
import {getAriaHTMLAttributes, TAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes, TDataHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/DataAttributes';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {isOnlyIE} from '@sberbusiness/triplex/desktop/utils/userAgentUtils';

/**
 * Свойства компонента HelpBox.
 */
export interface IHelpBoxProps extends React.HTMLAttributes<HTMLButtonElement>, Pick<ITooltipProps, 'isOpen' | 'onShow' | 'toggle'> {
    /** Aria-атрибуты tooltip. */
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    /** Data-атрибуты tooltip. */
    tooltipDataAttributes?: TDataHTMLAttributes;
    /** Размер тултипа. */
    tooltipSize: ETooltipSize;
}

/**
 * Компонент HelpBox. Иконка "?" со всплывающей подсказкой выбраного размера.
 */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    className,
    isOpen,
    onShow,
    tooltipSize,
    toggle,
    tooltipAriaAttributes,
    tooltipDataAttributes,
    ...targetHtmlAttrs
}) => {
    const [opened, setOpened] = useState(Boolean(isOpen));
    const tooltipId = useRef(uniqueId());

    useEffect(() => {
        // Изменение внутреннего флага opened, когда состояние компонента контролируется снаружи.
        if (isOpen !== undefined && isOpen !== opened) {
            setOpened(isOpen);
        }
    }, [isOpen, opened, setOpened]);

    /**
     * Обработчик закрытия/открытия тултипа.
     */
    const handleChangeOpened = useCallback(
        (opened: boolean) => {
            // Состояние компонента контролируется снаружи.
            if (toggle) {
                toggle(opened);
            } else {
                // Состояние компонента контролируется внутри.
                setOpened(opened);
            }
        },
        [toggle, setOpened]
    );

    /**
     * Обработчик клика по кнопке TargetButton.
     */
    const handleClickTargetButton = (): void => {
        handleChangeOpened(!opened);
    };

    /**
     * Обработчик клика по кнопке закрытия Tooltip.
     */
    const handleClickCloseButton = () => {
        handleChangeOpened(false);
    };

    return (
        <Tooltip
            id={tooltipId.current}
            tabIndex={-1}
            role="dialog"
            isOpen={opened}
            toggle={handleChangeOpened}
            size={tooltipSize}
            onShow={onShow}
            toggleType="hover"
            tabSensitive={false}
            {...(Boolean(tooltipAriaAttributes) && getAriaHTMLAttributes(tooltipAriaAttributes!))}
            {...(Boolean(tooltipDataAttributes) && getDataHTMLAttributes(tooltipDataAttributes!))}
        >
            <TooltipTarget>
                <ButtonIcon
                    className={classnames('cssClass[helpBoxButton]', className)}
                    aria-label="Подсказка"
                    onClick={handleClickTargetButton}
                    shape={EButtonIconShape.CIRCLE}
                    {...targetHtmlAttrs}
                >
                    <HintSrvIcon16 />
                </ButtonIcon>
            </TooltipTarget>
            <TooltipBody className="cssClass[helpBoxTooltipBody]">
                {/* Пакет FocusTrap не поддерживает IE. */}
                {isOnlyIE ? (
                    <div>
                        {children}
                        <Tooltip.XButton aria-label="Закрыть" onClick={handleClickCloseButton} />
                    </div>
                ) : (
                    <FocusTrap active={opened} focusTrapOptions={{initialFocus: `[id='${tooltipId.current}']`}}>
                        <div>
                            {children}
                            <Tooltip.XButton aria-label="Закрыть" onClick={handleClickCloseButton} />
                        </div>
                    </FocusTrap>
                )}
            </TooltipBody>
        </Tooltip>
    );
};

HelpBox.displayName = 'HelpBox';
