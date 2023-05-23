import {
    EStatusTrackerDeprecatedStepStatus,
    StatusTrackerDeprecatedStepNumber,
} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {mapStatusTrackerStepStatusToStepMarkerStatus} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/utils';
import {Step} from '@sberbusiness/triplex/desktop/components/Step/Step';
import * as React from 'react';

/**
 * Интерфейс компонента шага в статус трекере.
 * @param {StatusTrackerDeprecatedStepNumber} [iteratorStep] Очередной шаг из перечисления.
 * @prop {EStatusTrackerDeprecatedStepStatus} [status] Статус шага.
 * @prop {string} children Текст всплывающей подсказки.
 */
export interface IStatusTrackerDeprecatedStepProps extends React.HTMLAttributes<HTMLDivElement> {
    iteratorStep?: StatusTrackerDeprecatedStepNumber;
    status?: EStatusTrackerDeprecatedStepStatus;
    children: string;
}

/** Компонент шага в статус трекере. */
export class StatusTrackerDeprecatedStep extends React.PureComponent<IStatusTrackerDeprecatedStepProps> {
    public render(): JSX.Element {
        const {iteratorStep, status, children, ...htmlDivAttributes} = this.props;

        return (
            <Step step={iteratorStep!} status={mapStatusTrackerStepStatusToStepMarkerStatus(status!)} {...htmlDivAttributes}>
                {children}
            </Step>
        );
    }
}
