import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {EStatusTrackerStepDividerType, EStatusTrackerStepStatus} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import * as React from 'react';

/**
 * @prop {EStatusTrackerStepDividerType} type Тип разделителя шагов.
 * @prop {EStatusTrackerStepStatus} status Статус шага.
 */
export interface IStatusTrackerStepDividerProps {
    type: EStatusTrackerStepDividerType;
    status: EStatusTrackerStepStatus;
}

const stepStatusToClassMap = {
    [EStatusTrackerStepStatus.WAIT]: 'cssClass[wait]',
    [EStatusTrackerStepStatus.WARNING]: 'cssClass[warning]',
    [EStatusTrackerStepStatus.ERROR]: 'cssClass[error]',
    [EStatusTrackerStepStatus.SUCCESS]: 'cssClass[success]',
    [EStatusTrackerStepStatus.DISABLED]: 'cssClass[disabled]',
};

const dividerTypeToClassMap = {
    [EStatusTrackerStepDividerType.THREE_STEP]: 'cssClass[threeStepDivider]',
    [EStatusTrackerStepDividerType.FOUR_STEP_SHORT]: 'cssClass[fourStepDividerSide]',
    [EStatusTrackerStepDividerType.FOUR_STEP_LONG]: 'cssClass[fourStepDividerCenter]',
};

/** Рендер разделителя между шагами статус трекера. */
export const StatusTrackerStepDivider: React.FC<IStatusTrackerStepDividerProps> = ({type, status}) => {
    const statusClass = stepStatusToClassMap[status];
    const typeClass = dividerTypeToClassMap[type];

    if (process.env.NODE_ENV !== 'production') {
        if (statusClass === undefined) {
            throw Error(`StatusClass not mapped: '${status}'.`);
        }

        if (typeClass === undefined) {
            throw Error(`Type not mapped: '${type}'.`);
        }
    }

    return <div className={classnames('cssClass[statusTrackerStepDivider]', typeClass, statusClass)} />;
};

StatusTrackerStepDivider.displayName = 'StatusTrackerStepDivider';
