/** Статус шага. */
export enum EStepStatus {
    WAIT = 1,
    WARNING,
    ERROR,
    SUCCESS,
    DISABLED,
}

/** Позиция шага, относительно других. */
export enum EStepPosition {
    /** Обычная позиция. */
    Default = 'Default',
    /** Первый по оси X. */
    XFirst = 'XFirst',
    /** Последний по оси X. */
    XLast = 'XLast',
}
