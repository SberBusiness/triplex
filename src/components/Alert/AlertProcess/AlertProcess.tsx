import React, {useState, useEffect} from 'react';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {AlertProcessHeader} from '@sberbusiness/triplex/components/Alert/AlertProcess/components/AlertProcessHeader';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {mapAlertTypeToClassName, renderDefaultIcon} from '@sberbusiness/triplex/components/Alert/AlertTypeUtils';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';

/** @deprecated Устаревшие свойства компонента AlertProcess. */
export interface IDeprecatedAlertProcessProps extends Omit<IAlertProcessProps, 'type'> {
    /** Текст внутри компонента. */
    text: React.ReactNode;
}

/** Свойства компонента AlertProcess. */
export interface IAlertProcessProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип предупреждения. */
    type: Exclude<EAlertType, EAlertType.SYSTEM>;
    /** Модификатор возможности закрытия предупреждения. */
    closable?: boolean;
    /** Функция обработки закрытия. */
    onClose?: () => void;
    /** Рендер-функция заголовка. */
    renderHeader?: () => JSX.Element;
    /** Рендер-функция иконки. */
    renderIcon?: () => JSX.Element;
}

/** Внутренние составляющие процессного предупреждения. */
interface IAlertProcessComposition {
    Header: typeof AlertProcessHeader;
}

/** Компонент процессного предупреждения. */
export const AlertProcess: React.FC<IAlertProcessProps> & IAlertProcessComposition = ({
    children,
    className,
    type,
    closable,
    onClose,
    renderHeader,
    renderIcon,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!isOpen) {
            onClose?.();
        }
    }, [isOpen]);

    const handleClose = () => setIsOpen(false);

    const render = () => (
        <div
            className={classnames('cssClass[alertProcess]', mapAlertTypeToClassName(type), className)}
            {...rest}
            data-tx={process.env.npm_package_version}
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

    return isOpen ? render() : null;
};

AlertProcess.displayName = 'AlertProcess';
AlertProcess.Header = AlertProcessHeader;
