import {
    EStatusTrackerDeprecatedStepStatus,
    StatusTrackerDeprecatedStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';

/** Мап общего статуса компонента в статус конкретного шага.  */
const trackerStatusToStepStatusMap = {
    [StatusTrackerDeprecatedStatus.WAIT]: EStatusTrackerDeprecatedStepStatus.WAIT,
    [StatusTrackerDeprecatedStatus.WARNING]: EStatusTrackerDeprecatedStepStatus.WARNING,
    [StatusTrackerDeprecatedStatus.SUCCESS]: EStatusTrackerDeprecatedStepStatus.SUCCESS,
    [StatusTrackerDeprecatedStatus.ERROR]: EStatusTrackerDeprecatedStepStatus.ERROR,
};

/** Маппинг общего статуса компонента в статус конкретного шага.  */
export const mapTrackerStatusToStepStatus = (
    currentStep: StatusTrackerDeprecatedStepNumber,
    status: StatusTrackerDeprecatedStatus,
    iteratorStep: StatusTrackerDeprecatedStepNumber
): EStatusTrackerDeprecatedStepStatus => {
    let result;

    if (currentStep > iteratorStep) {
        result = EStatusTrackerDeprecatedStepStatus.SUCCESS;
    } else if (currentStep < iteratorStep) {
        result = EStatusTrackerDeprecatedStepStatus.DISABLED;
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
    [EStatusTrackerDeprecatedStepStatus.WAIT]: EStepStatus.WAIT,
    [EStatusTrackerDeprecatedStepStatus.WARNING]: EStepStatus.WARNING,
    [EStatusTrackerDeprecatedStepStatus.ERROR]: EStepStatus.ERROR,
    [EStatusTrackerDeprecatedStepStatus.SUCCESS]: EStepStatus.SUCCESS,
    [EStatusTrackerDeprecatedStepStatus.DISABLED]: EStepStatus.DISABLED,
};

/**
 * Мапинг статусов шагов трекера в шаги маркера.
 *
 * TODO: Выпилить в ближайшем мажорном релизе, перевести на общий энам.
 */
export const mapStatusTrackerStepStatusToStepMarkerStatus = (status: EStatusTrackerDeprecatedStepStatus): EStepStatus => {
    const result = statusTrackerStepStatusToStepMarkerStatusMap[status];

    if (result === undefined) {
        throw Error(`EStatusTrackerStepStatus not mapped: '${status}'.`);
    }

    return result;
};
