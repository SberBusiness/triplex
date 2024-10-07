import React from 'react';
import {Marker} from '@sberbusiness/triplex/components/Marker/Marker';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента MarkerStatus. */
export interface IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус. */
    status: EMarkerStatus;
    /** Дополнительное описание под наименованием статуса. */
    description?: React.ReactNode;
}

/** Компонент иконки статуса подписи. */
export class MarkerStatus extends React.PureComponent<IMarkerStatusProps> {
    static displayName = 'MarkerStatus';

    render(): JSX.Element {
        const {children, className, description, status} = this.props;
        return (
            <div className={classnames(className, 'cssClass[globalMarkerStatus]')} data-tx={process.env.npm_package_version}>
                <div className="cssClass[markerContainer]">
                    <Marker status={status} />
                </div>
                <div className="cssClass[markerStatusText]">{children}</div>
                {description && <div className="cssClass[markerStatusDesc]">{description}</div>}
            </div>
        );
    }
}
