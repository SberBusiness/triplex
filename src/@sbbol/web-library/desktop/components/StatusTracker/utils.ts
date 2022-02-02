import {
    EStatusTrackerStepStatus,
    StatusTrackerStatus,
    StatusTrackerStepNumber,
} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {EStepStatus} from '@sbbol/web-library/desktop/components/Step/enums';

/** Мап общего статуса компонента в статус конкретного шага.  */
const trackerStatusToStepStatusMap = {
    [StatusTrackerStatus.WAIT]: EStatusTrackerStepStatus.WAIT,
    [StatusTrackerStatus.WARNING]: EStatusTrackerStepStatus.WARNING,
    [StatusTrackerStatus.SUCCESS]: EStatusTrackerStepStatus.SUCCESS,
    [StatusTrackerStatus.ERROR]: EStatusTrackerStepStatus.ERROR,
};

/** Маппинг общего статуса компонента в статус конкретного шага.  */
export const mapTrackerStatusToStepStatus = (
    currentStep: StatusTrackerStepNumber,
    status: StatusTrackerStatus,
    iteratorStep: StatusTrackerStepNumber
): EStatusTrackerStepStatus => {
    let result;

    if (currentStep > iteratorStep) {
        result = EStatusTrackerStepStatus.SUCCESS;
    } else if (currentStep < iteratorStep) {
        result = EStatusTrackerStepStatus.DISABLED;
    } else {
        result = trackerStatusToStepStatusMap[status];
        if (result === undefined) {
            throw Error(`StatusTrackerStatus not mapped: '${status}'.`);
        }
    }

    return result;
};

/**
 * Мапа статусов шагов трекера в шаги маркера.
 *
 * TODO: Выпилить в ближайшем мажорном релизе, перевести на общий энам.
 */
const statusTrackerStepStatusToStepMarkerStatusMap = {
    [EStatusTrackerStepStatus.WAIT]: EStepStatus.WAIT,
    [EStatusTrackerStepStatus.WARNING]: EStepStatus.WARNING,
    [EStatusTrackerStepStatus.ERROR]: EStepStatus.ERROR,
    [EStatusTrackerStepStatus.SUCCESS]: EStepStatus.SUCCESS,
    [EStatusTrackerStepStatus.DISABLED]: EStepStatus.DISABLED,
};

/**
 * Мапинг статусов шагов трекера в шаги маркера.
 *
 * TODO: Выпилить в ближайшем мажорном релизе, перевести на общий энам.
 */
export const mapStatusTrackerStepStatusToStepMarkerStatus = (status: EStatusTrackerStepStatus): EStepStatus => {
    const result = statusTrackerStepStatusToStepMarkerStatusMap[status];

    if (result === undefined) {
        throw Error(`EStatusTrackerStepStatus not mapped: '${status}'.`);
    }

    return result;
};
