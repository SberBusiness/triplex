import React, {useState, useEffect, useCallback, useRef} from 'react';
import FocusTrap from 'focus-trap-react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {Tooltip, ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {getAriaHTMLAttributes, TAriaHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes, TDataHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/DataAttributes';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства компонента HelpBox. */
export interface IHelpBoxProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        Pick<ITooltipProps, 'isOpen' | 'preferPlace' | 'onShow' | 'toggle'> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    /** Aria-атрибуты Tooltip. */
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    /** Data-атрибуты Tooltip. */
    tooltipDataAttributes?: TDataHTMLAttributes;
    /** Размер Tooltip. */
    tooltipSize: ETooltipSize;
}

/** Иконка "?" со всплывающей подсказкой выбранного размера. */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    className,
    focusTrapProps,
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
            {...(Boolean(tooltipAriaAttributes) && getAriaHTMLAttributes(tooltipAriaAttributes!))}
            {...(Boolean(tooltipDataAttributes) && getDataHTMLAttributes(tooltipDataAttributes!))}
        >
            <Tooltip.Target>
                <ButtonIcon
                    className={classnames('cssClass[helpBoxButton]', className)}
                    aria-label="Подсказка"
                    onClick={handleClickTargetButton}
                    shape={EButtonIconShape.CIRCLE}
                    {...targetHtmlAttrs}
                >
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
            <Tooltip.Body className="cssClass[helpBoxTooltipBody]">
                <FocusTrap
                    active={opened}
                    {...focusTrapProps}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        initialFocus: `[id='${tooltipId.current}']`,
                        preventScroll: true,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                >
                    <div>
                        {children}
                        <Tooltip.XButton aria-label="Закрыть" />
                    </div>
                </FocusTrap>
            </Tooltip.Body>
        </Tooltip>
    );
};

HelpBox.displayName = 'HelpBox';
