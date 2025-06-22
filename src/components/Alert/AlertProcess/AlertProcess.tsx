import React, {useState} from 'react';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {AlertProcessHeader} from '@sberbusiness/triplex/components/Alert/AlertProcess/components/AlertProcessHeader';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {alertTypeToClassNameMap, renderDefaultIcon} from '@sberbusiness/triplex/components/Alert/AlertTypeUtils';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';

/** Свойства компонента AlertProcess. */
export interface IAlertProcessProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип предупреждения. */
    type: EAlertType;
    /** Модификатор возможности закрытия предупреждения. */
    closable?: boolean;
    /** Функция обработки закрытия. */
    onClose?: () => void;
    /** Рендер-функция заголовка. */
    renderHeader?: () => JSX.Element;
    /** Рендер-функция иконки. */
    renderIcon?: () => JSX.Element;
}

/** Компонент процессного предупреждения. */
export const AlertProcess = Object.assign(
    React.forwardRef<HTMLDivElement, IAlertProcessProps>(function AlertProcess(
        {children, className, type, closable, onClose, renderHeader, renderIcon, ...rest},
        ref
    ) {
        const [closed, setClosed] = useState(false);

        if (closed) {
            return null;
        }

        const handleClose = () => {
            setClosed(true);

            onClose?.();
        };

        return (
            <div
                className={classnames('cssClass[alertProcess]', alertTypeToClassNameMap[type], className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                <div className="cssClass[themeIcon]">{renderIcon ? renderIcon() : renderDefaultIcon(type)}</div>
                <div className="cssClass[alertProcessContentBlock]">
                    {renderHeader?.()}
                    {children}
                </div>
                {closable && (
                    <div className="cssClass[closeButton]">
                        <ButtonIcon onClick={handleClose}>
                            <ClosenotificationSrvxIcon16 />
                        </ButtonIcon>
                    </div>
                )}
            </div>
        );
    }),
    {
        Header: AlertProcessHeader,
    }
);

AlertProcess.displayName = 'AlertProcess';
AlertProcess.Header = AlertProcessHeader;
