/** Состояния у компонента StatusTrackerDeprecated. */
export enum StatusTrackerDeprecatedStatus {
    WAIT = 'cssClass[statusTrackerWait]',
    WARNING = 'cssClass[statusTrackerWarning]',
    ERROR = 'cssClass[statusTrackerError]',
    SUCCESS = 'cssClass[statusTrackerSuccess]',
}

/** Шаги мастера у компонента StatusTrackerDeprecated. */
export enum StatusTrackerDeprecatedStepNumber {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
}

/** Тип разделителя шагов. */
export enum EStatusTrackerDeprecatedStepDividerType {
    THREE_STEP,
    FOUR_STEP_SHORT,
    FOUR_STEP_LONG,
}

/** Статусы шага. */
export enum EStatusTrackerDeprecatedStepStatus {
    WAIT,
    WARNING,
    ERROR,
    SUCCESS,
    DISABLED,
}
