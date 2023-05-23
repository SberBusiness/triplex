/**
 * Находит позицию курсора в поле ввода.
 *
 * @param {HTMLInputElement} field Объект поля ввода.
 * @return {number} Искомая позиция курсора. (Возвращает -1, если не задано поле ввода или не удалось вычислить позицию).
 */
export function getCaretPosition(field: HTMLInputElement): number {
    if (!field) {
        return -1;
    }

    let position: number;
    const ie10DocumentSection = (document as any).selection;

    if (ie10DocumentSection) {
        field.focus();
        const range = ie10DocumentSection.createRange();
        range.moveStart('character', -field.value.length);
        position = range.text.length;
    } else {
        position = (field.selectionDirection === 'backward' ? field.selectionStart : field.selectionEnd) ?? -1;
    }

    return position;
}

/**
 * Устанавливает курсор в указанное место поля ввода.
 *
 * @param {HTMLInputElement | undefined} field Объект поля ввода.
 * @param {number} position Устанавливаемая позиция курсора.
 */
export function setCaretPosition(field: HTMLInputElement | undefined, position: number) {
    if (!field || field != document.activeElement) {
        return;
    }

    const ie10DocumentSection = (document as any).selection;

    if (ie10DocumentSection) {
        const range = ie10DocumentSection.createTextRange();
        range.move('character', position);
        range.select();
    } else if (typeof field.selectionStart === 'number') {
        field.setSelectionRange(position, position);
    }
}
