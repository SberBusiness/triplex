import {createContext} from 'react';
import {TAriaHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/AriaAttributes';

/** Контекст WidgetHeader. */
export interface IWidgetHeaderContext {
    /** Aria-атрибуты передаваемые из AccordionBase в WidgetHeader. Для поддержки accessibility. */
    ariaAttributes: TAriaHTMLAttributes;
    /** Флаг несворачиваемости виджета. */
    isStatic: boolean;
    /** Функция открытия/закрытия виджета. */
    toggle?: () => void;
}

export const WidgetHeaderContext = createContext<IWidgetHeaderContext>({
    ariaAttributes: {},
    isStatic: false,
    toggle: () => {},
});
