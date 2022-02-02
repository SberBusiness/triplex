/** Состояния у компонента StatusTracker. */
export enum StatusTrackerStatus {
    WAIT = 'cssClass[statusTrackerWait]',
    WARNING = 'cssClass[statusTrackerWarning]',
    ERROR = 'cssClass[statusTrackerError]',
    SUCCESS = 'cssClass[statusTrackerSuccess]',
}

/** Шаги мастера у компонента StatusTracker. */
export enum StatusTrackerStepNumber {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
}

/** Тип разделителя шагов. */
export enum EStatusTrackerStepDividerType {
    THREE_STEP,
    FOUR_STEP_SHORT,
    FOUR_STEP_LONG,
}

/** Статусы шага. */
export enum EStatusTrackerStepStatus {
    WAIT,
    WARNING,
    ERROR,
    SUCCESS,
    DISABLED,
}
