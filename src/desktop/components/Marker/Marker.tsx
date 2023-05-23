import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EMarkerStatus} from '@sberbusiness/triplex/desktop/components/Marker/enums';
import * as React from 'react';

/**
 * Интерфейс компонента Marker.
 *
 * @prop {EMarkerStatus} status.
 */
export interface IMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
    status: EMarkerStatus;
}

const getClassNameFromStatus = (status: EMarkerStatus): string => {
    switch (status) {
        case EMarkerStatus.SUCCESS:
            return 'cssClass[markerSuccess]';
        case EMarkerStatus.ERROR:
            return 'cssClass[markerError]';
        case EMarkerStatus.WARNING:
            return 'cssClass[markerWarning]';
        case EMarkerStatus.WAITING:
            return 'cssClass[markerWaiting]';
    }
};

const getClassName = (status: EMarkerStatus, className?: string): string =>
    classnames(className, 'cssClass[marker]', getClassNameFromStatus(status));

/**
 * Компонент иконки статуса.
 */
export const Marker: React.FC<IMarkerProps> = ({className, status, ...htmlDivAttributes}) => (
    <div className={getClassName(status, className)} {...htmlDivAttributes} />
);

Marker.displayName = 'Marker';
