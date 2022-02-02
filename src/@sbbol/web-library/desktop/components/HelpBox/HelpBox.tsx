import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import {TooltipBody} from '@sbbol/web-library/desktop/components/Tooltip/TooltipBody';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ITooltipProps} from '@sbbol/web-library/desktop/components/Tooltip/types';
import {TooltipTarget} from '@sbbol/web-library/desktop/components/Tooltip/TooltipTarget';
import {getAriaHTMLAttributes, TAriaHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/AriaAttributes';
import {getDataHTMLAttributes, TDataHTMLAttributes} from '@sbbol/web-library/desktop/utils/HTML/DataAttributes';
import {isReactElement, isReactText} from '@sbbol/web-library/desktop/utils/reactChild';
import * as React from 'react';

/**
 * Свойства компонента HelpBox.
 * @prop {React.ReactElement | React.ReactElement[]} children Тело тултипа и еще другие элементы которые предусмотрены в тултипе (ссылка, крестик).
 * @prop {TAriaAttributes} tooltipAriaAttributes Aria-атрибуты tooltip.
 * @prop {TDataAttributes} tooltipDataAttributes Data-атрибуты tooltip.
 * @prop {tooltipSize} tooltipSize Размер тултипа.
 * @prop {(tooltip: HTMLDivElement) => void} [onShow] Обработчик который вызывается при открытии тултипа, tooltip - реф на тултип.
 * @prop {boolean} [tabSensitive] Признак реагирования хелпбокса на таб. Закрытие и открытие тултипа по табу (для screen reader). По умолчанию включен.
 * @prop {boolean} [isOpen] Признак открыт ли Tooltip.
 * @prop {boolean} [toggle] Контролирующая функция закрытия/открытия.
 */
export interface IHelpBoxProps extends React.HTMLAttributes<HTMLDivElement>, Pick<ITooltipProps, 'isOpen' | 'toggle'> {
    children: React.ReactText | React.ReactElement | React.ReactElement[];
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    tooltipDataAttributes?: TDataHTMLAttributes;
    tooltipSize: ETooltipSize;
    onShow?: (tooltip: HTMLDivElement) => void;
    tabSensitive?: boolean;
}

/**
 * Компонент HelpBox. Иконка "?" со всплывающей подсказкой выбраного размера.
 */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    tooltipAriaAttributes,
    tooltipDataAttributes,
    tooltipSize,
    onShow,
    tabSensitive = true,
    isOpen,
    toggle,
    ...targetHtmlAttrs
}) => {
    const tooltipChildren: React.ReactElement[] = [];
    tooltipChildren.push(
        <TooltipTarget key={1}>
            <div className="cssClass[helpBoxIcon]" {...targetHtmlAttrs}>
                <ButtonIcon tabIndex={tabSensitive ? 0 : -1}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </div>
        </TooltipTarget>
    );
    if (isReactText(children) || isReactElement(children)) {
        tooltipChildren.push(<TooltipBody key={3}>{children}</TooltipBody>);
    } else {
        children.map((child) => {
            tooltipChildren.push(child);
        });
    }

    return (
        <Tooltip
            isOpen={isOpen}
            toggle={toggle}
            size={tooltipSize}
            onShow={onShow}
            toggleType="hover"
            tabSensitive
            {...(Boolean(tooltipAriaAttributes) && getAriaHTMLAttributes(tooltipAriaAttributes!))}
            {...(Boolean(tooltipDataAttributes) && getDataHTMLAttributes(tooltipDataAttributes!))}
        >
            {tooltipChildren}
        </Tooltip>
    );
};

HelpBox.displayName = 'HelpBox';
