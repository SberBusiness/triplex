import React, {useState, useEffect, useRef} from 'react';
import FocusTrap from 'focus-trap-react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {Tooltip, ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TooltipMobileHeader} from '@sberbusiness/triplex/components/Tooltip/components/mobile/components/TooltipMobileHeader';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
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
    /** Контент заголовка TooltipMobile. */
    mobileHeaderContent?: React.ReactNode;
}

/** Иконка "?" со всплывающей подсказкой выбранного размера. */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    className,
    focusTrapProps,
    mobileHeaderContent,
    isOpen: openProp,
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
    const [openState, setOpenState] = useState(Boolean(openProp));
    // Элементы являющиеся границами для ловушки фокуса.
    const [containerElements, setContainerElements] = useState<HTMLElement[]>([]);
    const tooltipId = useRef(uniqueId());

    useEffect(() => {
        if (openProp !== undefined && openProp !== openState) {
            setOpenState(openProp);
        }
    }, [openProp, openState]);

    useEffect(() => {
        if (!openState) {
            setContainerElements([]);
        }
    }, [openState]);

    /** Обработчик закрытия/открытия Tooltip. */
    const handleTooltipToggle = (open: boolean) => {
        if (openProp === undefined) {
            setOpenState(open);
        }

        toggle?.(open);
    };

    /** Обработчик появления Tooltip. */
    const handleTooltipShow = (node: HTMLDivElement) => {
        setContainerElements([node]);

        onShow?.(node);
    };

    /** Рендер ловушки фокуса. */
    const renderFocusTrap = () => (
        <MobileView
            fallback={
                <FocusTrap
                    active={openState}
                    {...focusTrapProps}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        initialFocus: `[id='${tooltipId.current}']`,
                        preventScroll: true,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                    containerElements={containerElements}
                />
            }
        >
            {null}
        </MobileView>
    );

    return (
        <>
            <Tooltip
                id={tooltipId.current}
                tabIndex={-1}
                role="dialog"
                toggleType="hover"
                size={tooltipSize}
                preferPlace={preferPlace}
                isOpen={openState}
                toggle={handleTooltipToggle}
                onShow={handleTooltipShow}
                {...(Boolean(tooltipAriaAttributes) && getAriaHTMLAttributes(tooltipAriaAttributes!))}
                {...(Boolean(tooltipDataAttributes) && getDataHTMLAttributes(tooltipDataAttributes!))}
            >
                <Tooltip.Target>
                    <ButtonIcon
                        className={classnames('cssClass[helpBoxButton]', className)}
                        aria-label="Подсказка"
                        shape={EButtonIconShape.CIRCLE}
                        {...targetHtmlAttrs}
                    >
                        <HintSrvIcon16 />
                    </ButtonIcon>
                </Tooltip.Target>
                {mobileHeaderContent && <TooltipMobileHeader>{mobileHeaderContent}</TooltipMobileHeader>}
                <Tooltip.Body className="cssClass[helpBoxTooltipBody]">{children}</Tooltip.Body>
                <Tooltip.XButton aria-label="Закрыть" />
            </Tooltip>
            {openState && renderFocusTrap()}
        </>
    );
};

HelpBox.displayName = 'HelpBox';
