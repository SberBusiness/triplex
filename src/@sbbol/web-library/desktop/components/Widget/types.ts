import {IAccordionBodyProvideProps, IAccordionHeaderProvideProps} from '../AccordionBase/types';

/**
 * Свойства, передаваемые Widget в WidgetBody.
 *
 * @prop {boolean} widgetWithoutFooter Флаг, Widget не имеет Footer.
 */
export interface IWidgetBodyProvideProps extends IAccordionBodyProvideProps {
    widgetWithoutFooter: boolean;
}

/**
 * Свойства, передаваемые Widget в WidgetHeader.
 *
 * @prop {boolean} staticWidget Флаг, Widget несворачиваемый.
 */
export interface IWidgetHeaderProvideProps extends Omit<IAccordionHeaderProvideProps, 'toggle'> {
    isStatic: boolean;
    toggle?: () => void;
}

/**
 * Свойства, передаваемые Widget в WidgetFooter.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IWidgetFooterProvideProps {}
