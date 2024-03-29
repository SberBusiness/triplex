import React from 'react';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {InfoStsIcon16} from '@sberbusiness/icons/InfoStsIcon16';
import {WarningStsIcon16} from '@sberbusiness/icons/WarningStsIcon16';
import {ErrorStsIcon16} from '@sberbusiness/icons/ErrorStsIcon16';
import {SystemStsIcon16} from '@sberbusiness/icons/SystemStsIcon16';
import {ReportstogovernmentPrdIcon20} from '@sberbusiness/icons/ReportstogovernmentPrdIcon20';

/** Получить иконку по типу предупреждения. */
export function renderDefaultIcon(type: EAlertType): JSX.Element {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStsIcon16 />;
        case EAlertType.WARNING:
            return <WarningStsIcon16 />;
        case EAlertType.ERROR:
            return <ErrorStsIcon16 />;
        case EAlertType.SYSTEM:
            return <SystemStsIcon16 />;
        case EAlertType.FEATURE:
            return (
                <div className="hoverable active">
                    <ReportstogovernmentPrdIcon20 />
                </div>
            );
    }
}

/** Получить класс по типу предупреждения. */
export function mapAlertTypeToClassName(type: EAlertType): string {
    switch (type) {
        case EAlertType.INFO:
            return 'cssClass[alertTypeInfo]';
        case EAlertType.WARNING:
            return 'cssClass[alertTypeWarning]';
        case EAlertType.ERROR:
            return 'cssClass[alertTypeError]';
        case EAlertType.SYSTEM:
            return 'cssClass[alertTypeSystem]';
        case EAlertType.FEATURE:
            return 'cssClass[alertTypeFeature]';
    }
}
