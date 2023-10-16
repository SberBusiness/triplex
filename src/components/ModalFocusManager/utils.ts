/** Функция фокуса с возвратом скролла. */
export const staticPositionFocus = (elem: HTMLElement): void => {
    const x = window.scrollX;
    const y = window.scrollY;

    elem.focus({preventScroll: true});
    window.scrollTo(x, y);
};

// Взято из https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html.
/** Проверка, может ли элемент быть в фокусе. */
export const isFocusable = (element: HTMLElement): boolean => {
    if ((element.tabIndex < 0 || !element.focus) && !element.hasAttribute('data-first-interaction-element')) {
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
        case 'DIV':
        case 'H1': {
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
export const findFirstInteractiveElement = (element: HTMLElement, exclude?: (element: HTMLElement) => boolean): HTMLElement | null => {
    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i] as HTMLElement;

        // Не Element, может быть текст или комментарий.
        if (child.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }

        if (exclude && exclude(child)) {
            continue;
        }

        if (isFocusable(child)) {
            return child;
        }

        const firstActiveElement = findFirstInteractiveElement(child, exclude);
        if (firstActiveElement) {
            return firstActiveElement;
        }
    }

    return null;
};
