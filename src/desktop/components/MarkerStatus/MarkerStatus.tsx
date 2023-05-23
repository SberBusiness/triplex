import {EMarkerStatus} from '@sberbusiness/triplex/desktop/components/Marker/enums';
import {Marker} from '@sberbusiness/triplex/desktop/components/Marker/Marker';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Интерфейс компонента MarkerStatus.
 *
 * @prop {EMarkerStatus} status Статус.
 * @prop {React.ReactText} children Наименование статуса.
 * @prop {React.ReactText} [description] Дополнительное описание под наименованием статуса.
 */
export interface IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    status: EMarkerStatus;
    description?: React.ReactNode;
}

/**
 * Компонент иконки статуса подписи.
 */
export class MarkerStatus extends React.PureComponent<IMarkerStatusProps> {
    static displayName = 'MarkerStatus';

    render(): JSX.Element {
        const {children, className, description, status} = this.props;
        return (
            <div className={classnames(className, 'cssClass[globalMarkerStatus]')}>
                <div className="cssClass[markerContainer]">
                    <Marker status={status} />
                </div>
                <div className="cssClass[markerStatusText]">{children}</div>
                {description && <div className="cssClass[markerStatusDesc]">{description}</div>}
            </div>
        );
    }
}
