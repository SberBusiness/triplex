/** Вкладка календаря. */
export enum ECalendarTab {
    /** Десятилетие. */
    DECADE = 1,
    /** Год. */
    YEAR = 2,
    /** Месяц. */
    MONTH = 3,
}

/** Тип периода в календаре. (запрещено менять, это ключи в moment.js ) */
export enum ECalendarMomentPeriodType {
    YEAR = 'year',
    MONTH = 'month',
}
