import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {
    EStatusTrackerDeprecatedStepDividerType,
    EStatusTrackerDeprecatedStepStatus,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import * as React from 'react';

/**
 * @prop {EStatusTrackerDeprecatedStepDividerType} type Тип разделителя шагов.
 * @prop {EStatusTrackerDeprecatedStepStatus} status Статус шага.
 */
export interface IStatusTrackerDeprecatedStepDividerProps {
    type: EStatusTrackerDeprecatedStepDividerType;
    status: EStatusTrackerDeprecatedStepStatus;
}

const stepStatusToClassMap = {
    [EStatusTrackerDeprecatedStepStatus.WAIT]: 'cssClass[wait]',
    [EStatusTrackerDeprecatedStepStatus.WARNING]: 'cssClass[warning]',
    [EStatusTrackerDeprecatedStepStatus.ERROR]: 'cssClass[error]',
    [EStatusTrackerDeprecatedStepStatus.SUCCESS]: 'cssClass[success]',
    [EStatusTrackerDeprecatedStepStatus.DISABLED]: 'cssClass[disabled]',
};

const dividerTypeToClassMap = {
    [EStatusTrackerDeprecatedStepDividerType.THREE_STEP]: 'cssClass[threeStepDivider]',
    [EStatusTrackerDeprecatedStepDividerType.FOUR_STEP_SHORT]: 'cssClass[fourStepDividerSide]',
    [EStatusTrackerDeprecatedStepDividerType.FOUR_STEP_LONG]: 'cssClass[fourStepDividerCenter]',
};

/** Рендер разделителя между шагами статус трекера. */
export const StatusTrackerDeprecatedStepDivider: React.FC<IStatusTrackerDeprecatedStepDividerProps> = ({type, status}) => {
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

    return <div className={classnames('cssClass[statusTrackerDeprecatedStepDivider]', typeClass, statusClass)} />;
};

StatusTrackerDeprecatedStepDivider.displayName = 'StatusTrackerDeprecatedStepDivider';
