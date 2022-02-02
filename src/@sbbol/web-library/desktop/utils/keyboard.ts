/**
 * Коды клавиш.
 */
export const EVENT_KEYS = {
    ARROW_DOWN: ['ArrowDown', 'Down'],
    ARROW_LEFT: ['ArrowLeft', 'Left'],
    ARROW_RIGHT: ['ArrowRight', 'Right'],
    ARROW_UP: ['ArrowUp', 'Up'],
    BACKSPACE: ['Backspace'],
    DELETE: ['Delete', 'Del'],
    ENTER: ['Enter'],
    ESC: ['Escape', 'Esc'],
    SPACE: ['Spacebar', 'Space'],
    TAB: ['Tab'],
    X: ['KeyX', 'X', 'x'],
    Y: ['KeyY', 'Y', 'y'],
    Z: ['KeyZ', 'Z', 'z'],
};

// Тип ключи EVENT_KEYS.
export type TEventKeys = keyof typeof EVENT_KEYS;

// Тип значения EVENT_KEYS.
export type TEventKeysValues = typeof EVENT_KEYS[TEventKeys];

/**
 * Числовые коды клавиш.
 */
export const EVENT_KEY_CODES = {
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    ARROW_UP: 38,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    TAB: 9,
};

/**
 * Предикат для проверки нажатой клавиши на соответствие с target. isKey(key, 'Enter');
 * @param {string | number} key Код нажатой клавиши.
 * @param {keyof typeof EVENT_KEY_CODES} target Ожидаемая клавиша.
 */
export function isKey(key: string | number, target: keyof typeof EVENT_KEY_CODES): boolean {
    if (typeof key === 'string') {
        return EVENT_KEYS[target].includes(key);
    }
    // IE fallback.
    return key === EVENT_KEY_CODES[target];
}
