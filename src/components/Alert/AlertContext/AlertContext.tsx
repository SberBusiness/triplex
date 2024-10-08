import React from 'react';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {mapAlertTypeToClassName, renderDefaultIcon} from '@sberbusiness/triplex/components/Alert/AlertTypeUtils';

/** Свойства компонента AlertContext. */
export interface IAlertContextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тип предупреждения (info/warning/error/system). */
    type: Exclude<EAlertType, EAlertType.FEATURE>;
    /** Флаг отображения компонента, используется для чтения скрин-ридером, по умолчанию true. */
    visible?: boolean;
}

/** Компонент контекстного предупреждения. */
export const AlertContext: React.FC<IAlertContextProps> = ({children, className, type, visible = true, ...rest}) =>
    visible ? (
        <span
            role="alert"
            className={classnames('cssClass[alertContext]', mapAlertTypeToClassName(type), className)}
            {...rest}
            data-tx={process.env.npm_package_version}
        >
            {renderDefaultIcon(type)}
            <span className="cssClass[alertContextText]">{children}</span>
        </span>
    ) : null;
