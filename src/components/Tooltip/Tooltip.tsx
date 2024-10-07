import React, {useState, useEffect, useCallback, useRef} from 'react';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {TooltipDesktop} from '@sberbusiness/triplex/components/Tooltip/components/desktop/TooltipDesktop';
import {TooltipMobile} from '@sberbusiness/triplex/components/Tooltip/components/mobile/TooltipMobile';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/components/common/TooltipBody';
import {TooltipLink} from '@sberbusiness/triplex/components/Tooltip/components/common/TooltipLink';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/components/common/TooltipTarget';
import {TooltipXButton} from '@sberbusiness/triplex/components/Tooltip/components/common/TooltipXButton';
import {TooltipMobileHeader} from '@sberbusiness/triplex/components/Tooltip/components/mobile/components/TooltipMobileHeader';
import {ETooltipAlign, ETooltipPreferPlace, ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ITooltipElements, TTooltipToggleType} from '@sberbusiness/triplex/components/Tooltip/types';

/** Свойства компонента Tooltip. */
export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер подсказки. */
    size: ETooltipSize;
    /** Подсказка должна появляться по наведению или по клику. */
    toggleType?: TTooltipToggleType;
    /** Предпочитаемое место расположения подсказки. Если не помещается, то отобразится там где помещается. */
    preferPlace?: ETooltipPreferPlace;
    /** Расположение указателя. */
    alignTip?: ETooltipAlign;
    /** Элемент в который будет происходить рендер подсказки. */
    renderContainer?: Element;
    /** Отключить режим адаптивности. */
    disableAdaptiveMode?: boolean;
    /** Признак открыт ли Tooltip. */
    isOpen?: boolean;
    /** Контролирующая функция закрытия/открытия. */
    toggle?: (open: boolean) => void;
    /** Callback-функция появления Tooltip. */
    onShow?: (node: HTMLDivElement) => void;
}

/** Внутренние составляющие компонента Tooltip. */
interface ITooltipComposition {
    Target: typeof TooltipTarget;
    Body: typeof TooltipBody;
    Link: typeof TooltipLink;
    XButton: typeof TooltipXButton;
    MobileHeader: typeof TooltipMobileHeader;
}

/** Всплывающая подсказка. */
export const Tooltip: React.FC<ITooltipProps> & ITooltipComposition = ({
    children,
    toggleType,
    preferPlace,
    disableAdaptiveMode,
    isOpen: openProp,
    toggle,
    ...rest
}) => {
    const [openState, setOpenState] = useState(false);
    const hoveredRef = useRef(false);
    const open = openProp ?? openState;

    useEffect(() => {
        if (openProp === false) {
            hoveredRef.current = false;
        }
    }, [openProp]);

    /** Получить дочерние React-элементы. */
    const getChildrenElements = useCallback(() => {
        const elements: ITooltipElements = {body: null, closeButton: null, mobileHeader: null, target: null};

        React.Children.map(children, (child) => {
            if (React.isValidElement<React.ReactElement>(child)) {
                if (child.type === TooltipTarget) {
                    elements.target = child as React.ReactElement;
                } else if (child.type === TooltipBody) {
                    elements.body = child as React.ReactElement;
                } else if (child.type === TooltipXButton) {
                    elements.closeButton = child as React.ReactElement;
                } else if (child.type === TooltipMobileHeader) {
                    elements.mobileHeader = child as React.ReactElement;
                }
            }
        });

        return elements;
    }, [children]);

    /** Обработчик изменения состояния компонента. */
    const handleOpen = (nextOpen: boolean) => {
        if (openProp === undefined) {
            if (!nextOpen) {
                hoveredRef.current = false;
            }
            setOpenState(nextOpen);
        }

        toggle?.(nextOpen);
    };

    /** Рендер десктоп версии компонента. */
    const renderDesktopTooltip = () => {
        return <TooltipDesktop isOpen={open} toggleType={toggleType} preferPlace={preferPlace} {...rest} />;
    };

    /** Рендер мобильной версии компонента. */
    const renderMobileTooltip = () => {
        return <TooltipMobile isOpen={open} {...rest} />;
    };

    return (
        <TooltipContext.Provider
            value={{
                elements: getChildrenElements(),
                setTooltipOpen: handleOpen,
                toggleType,
                tooltipHoveredRef: hoveredRef,
                tooltipOpen: open,
            }}
        >
            {disableAdaptiveMode ? (
                renderDesktopTooltip()
            ) : (
                <MobileView fallback={renderDesktopTooltip()}>{renderMobileTooltip()}</MobileView>
            )}
        </TooltipContext.Provider>
    );
};

Tooltip.Target = TooltipTarget;
Tooltip.Body = TooltipBody;
Tooltip.Link = TooltipLink;
Tooltip.XButton = TooltipXButton;
Tooltip.MobileHeader = TooltipMobileHeader;
