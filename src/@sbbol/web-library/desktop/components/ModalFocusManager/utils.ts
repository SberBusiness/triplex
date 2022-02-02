/** Функция фокуса с возвратом скролла. */
export const staticPositionFocus = (elem: HTMLElement): void => {
    const x = window.scrollX;
    const y = window.scrollY;

    elem.focus();
    window.scrollTo(x, y);
};

// Взято из https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html.
/** Проверка, может ли элемент быть в фокусе. */
export const isFocusable = (element: HTMLElement): boolean => {
    if (element.tabIndex < 0 || !element.focus) {
        return false;
    }

    if ((element as HTMLInputElement).disabled) {
        return false;
    }

    switch (element.nodeName) {
        case 'A': {
            const anchorElement = element as HTMLAnchorElement;
            return !!anchorElement.href && anchorElement.rel != 'ignore';
        }
        case 'DIV': {
            return element.hasAttribute('data-first-interaction-element');
        }
        case 'INPUT': {
            const inputElement = element as HTMLInputElement;
            return inputElement.type != 'hidden';
        }
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        default:
            return false;
    }
};

// Взято из https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html, но немного переписано.
/** Поиск по dom первого элемента, который может быть в фокусе. */
export const findFirstInteractiveElement = (element: HTMLElement): HTMLElement | null => {
    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i] as HTMLElement;

        if (isFocusable(child)) {
            return child;
        }

        const firstActiveElement = findFirstInteractiveElement(child);
        if (firstActiveElement) {
            return firstActiveElement;
        }
    }

    return null;
};
