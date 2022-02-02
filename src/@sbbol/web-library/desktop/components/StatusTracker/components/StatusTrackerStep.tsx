import {EStatusTrackerStepStatus, StatusTrackerStepNumber} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {mapStatusTrackerStepStatusToStepMarkerStatus} from '@sbbol/web-library/desktop/components/StatusTracker/utils';
import {Step} from '@sbbol/web-library/desktop/components/Step/Step';
import * as React from 'react';

/**
 * Интерфейс компонента шага в статус трекере.
 * @param {StatusTrackerStepNumber} [iteratorStep] Очередной шаг из перечисления.
 * @prop {EStatusTrackerStepStatus} [status] Статус шага.
 * @prop {string} children Текст всплывающей подсказки.
 */
export interface IStatusTrackerStepProps extends React.HTMLAttributes<HTMLDivElement> {
    iteratorStep?: StatusTrackerStepNumber;
    status?: EStatusTrackerStepStatus;
    children: string;
}

/** Компонент шага в статус трекере. */
export class StatusTrackerStep extends React.PureComponent<IStatusTrackerStepProps> {
    public render(): JSX.Element {
        const {iteratorStep, status, children, ...htmlDivAttributes} = this.props;

        return (
            <Step step={iteratorStep!} status={mapStatusTrackerStepStatusToStepMarkerStatus(status!)} {...htmlDivAttributes}>
                {children}
            </Step>
        );
    }
}
