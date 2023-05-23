import {TAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';

/**
 * Свойства, передаваемые в рендер-функцию body.
 *
 * @prop {boolean} animating Анимируется в текущий момент.
 * @prop {boolean} isOpen флаг раскрытости.
 * @prop {Function} [toggle] Функция открыть/закрыть.
 */
export interface IAccordionBodyProvideProps {
    animating: boolean;
    isOpen: boolean;
    toggle: () => void;
}

/**
 * Свойства, передаваемые в рендер-функцию header.
 *
 * @prop {boolean} animating Анимируется в текущий момент.
 * @prop {TAriaAttributes} ariaAttributes Aria-атрибуты a11y.
 * @prop {boolean} isOpen флаг раскрытости.
 * @prop {Function} [toggle] Функция открыть/закрыть.
 */
export interface IAccordionHeaderProvideProps {
    animating: boolean;
    ariaAttributes: TAriaHTMLAttributes;
    isOpen: boolean;
    toggle: () => void;
}

/**
 * Свойства AccordionBase.
 *
 * @prop {string} [expandAnimationClassName] ClassName для ExpandAnimation.
 * @prop {boolean} [isOpen] флаг раскрытости.
 * @prop {Function} [onToggle] Обработчик открытия/закрытия.
 * @prop {Function} renderBody Рендер-функция body.
 * @prop {Function} renderHeader Рендер-функция header.
 * @prop {Function} [toggle] Функция открыть/закрыть.
 */
export interface IAccordionBaseProps {
    children?: never;
    expandAnimationClassName?: string;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    renderBody: (props: IAccordionBodyProvideProps) => JSX.Element | JSX.Element[] | undefined;
    renderHeader: (props: IAccordionHeaderProvideProps) => JSX.Element;
    toggle?: (isOpen: boolean) => void;
}
