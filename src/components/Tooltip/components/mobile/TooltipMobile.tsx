import React, {useEffect, useContext, useRef} from 'react';
import {ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import {DropdownMobile} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobile';
import {DropdownMobileBody} from '@sberbusiness/triplex/components/Dropdown/mobile/DropdownMobileBody';
import {TooltipMobileCloseButton} from '@sberbusiness/triplex/components/Tooltip/components/mobile/components/TooltipMobileCloseButton';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента TooltipMobile. */
export interface ITooltipMobileProps extends Omit<ITooltipProps, 'preferPlace' | 'toggle'> {
    /** Признак открыт ли TooltipMobile. */
    isOpen: boolean;
    /** Дочерние элементы. */
    children?: never;
}

/** Мобильная версия Tooltip. */
export const TooltipMobile: React.FC<ITooltipMobileProps> = ({children, className, renderContainer, isOpen, onShow, ...rest}) => {
    const {elements, setTooltipOpen} = useContext(TooltipContext);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const classNames = classnames('cssClass[tooltipMobile]', className);

    useEffect(() => {
        if (isOpen) {
            onShow?.(tooltipRef.current!);
        }
    }, [isOpen, onShow]);

    /** Рендер кнопки закрытия. */
    const renderCloseButton = () => {
        return <TooltipMobileCloseButton {...elements.closeButton?.props} />;
    };

    return (
        <>
            {elements.target}
            <Portal container={document.body}>
                <DropdownMobile className={classNames} tabIndex={-1} opened={isOpen} setOpened={setTooltipOpen} {...rest} ref={tooltipRef}>
                    {elements.mobileHeader}
                    <DropdownMobileBody className="cssClass[tooltipDropdownMobileBody]">
                        {elements.body}
                        {elements.mobileHeader === null && renderCloseButton()}
                    </DropdownMobileBody>
                </DropdownMobile>
            </Portal>
        </>
    );
};
