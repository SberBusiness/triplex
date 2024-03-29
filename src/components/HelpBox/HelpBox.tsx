import React, {useState, useEffect, useCallback, useRef} from 'react';
import FocusTrap from 'focus-trap-react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/types';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';
import {getAriaHTMLAttributes, TAriaHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes, TDataHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/DataAttributes';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента HelpBox. */
export interface IHelpBoxProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        Pick<ITooltipProps, 'isOpen' | 'preferPlace' | 'onShow' | 'toggle'> {
    /** Aria-атрибуты tooltip. */
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    /** Data-атрибуты tooltip. */
    tooltipDataAttributes?: TDataHTMLAttributes;
    /** Размер тултипа. */
    tooltipSize: ETooltipSize;
}

/** Иконка "?" со всплывающей подсказкой выбраного размера. */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    className,
    isOpen,
    onClick,
    onShow,
    onKeyDown,
    tooltipSize,
    preferPlace,
    toggle,
    tooltipAriaAttributes,
    tooltipDataAttributes,
    ...targetHtmlAttrs
}) => {
    const [opened, setOpened] = useState(Boolean(isOpen));
    const tooltipId = useRef(uniqueId());
    const tooltipBodyRef = useRef<HTMLDivElement>(null);

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
     * Обработчик клика по кнопке закрытия Tooltip.
     */
    const handleClickCloseButton = () => {
        // Тригеррится событие mouseleave вместо setOpened(false) тк внутри Tooltip компонент Hoverable имеет флаг isHovered, который останется true на мобильных устройствах.
        const event = new MouseEvent('mouseleave', {bubbles: true, cancelable: true});

        tooltipBodyRef.current?.dispatchEvent(event);
    };

    /**
     * Обработчик нажатия мыши на TargetButton.
     * Скринридеры на Windows при нажатии на кнопку вызывают не событие клавиатуры(Enter), а клик.
     */
    const handleClickTargetButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (!opened) {
            handleChangeOpened(true);
        }

        onClick?.(event);
    };

    return (
        <Tooltip
            id={tooltipId.current}
            tabIndex={-1}
            role="dialog"
            isOpen={opened}
            toggle={handleChangeOpened}
            size={tooltipSize}
            preferPlace={preferPlace}
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
            <TooltipBody className="cssClass[helpBoxTooltipBody]" forwardedRef={tooltipBodyRef}>
                <FocusTrap
                    active={opened}
                    focusTrapOptions={{clickOutsideDeactivates: true, initialFocus: `[id='${tooltipId.current}']`, preventScroll: true}}
                >
                    <div>
                        {children}
                        <Tooltip.XButton aria-label="Закрыть" onClick={handleClickCloseButton} />
                    </div>
                </FocusTrap>
            </TooltipBody>
        </Tooltip>
    );
};

HelpBox.displayName = 'HelpBox';
