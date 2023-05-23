import * as React from 'react';
import {AlertProcess, IAlertProcessProps} from '@sberbusiness/triplex/desktop/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';
import {AccountsPrdIcon20} from '@sberbusiness/icons/AccountsPrdIcon20';
import {renderDefaultIcon} from '@sberbusiness/triplex/desktop/components/Alert/AlertTypeUtils';
import {LinkNavIcon16} from '@sberbusiness/icons/LinkNavIcon16';
import {OninfowarningStsIcon16} from '@sberbusiness/icons/OninfowarningStsIcon16';
import {OninfoerrorStsIcon16} from '@sberbusiness/icons/OninfoerrorStsIcon16';

const getAlertParamsByType = (type: Exclude<EAlertType, EAlertType.SYSTEM>): IAlertProcessProps => {
    const closable = EAlertType.FEATURE === type;
    const onClose = EAlertType.FEATURE === type ? () => alert('Close button pressed') : undefined;
    const renderIcon = () => renderDefaultIcon(type);

    return {closable, onClose, renderIcon, type};
};

const getCustomIconByType = (type: Exclude<EAlertType, EAlertType.SYSTEM>): JSX.Element => {
    switch (type) {
        case EAlertType.INFO:
            return <LinkNavIcon16 />;
        case EAlertType.WARNING:
            return <OninfowarningStsIcon16 />;
        case EAlertType.ERROR:
            return <OninfoerrorStsIcon16 />;
        case EAlertType.FEATURE:
            return (
                <div className="hoverable active">
                    <AccountsPrdIcon20 />
                </div>
            );
    }
};

export const AlertProcessExample = ({
    type,
    isCustomIcon,
}: {
    type: Exclude<EAlertType, EAlertType.SYSTEM>;
    isCustomIcon: boolean;
}): JSX.Element => {
    const {closable, onClose, renderIcon} = getAlertParamsByType(type);
    const renderCustomIcon = () => getCustomIconByType(type);
    const renderAlertProcessIcon = isCustomIcon ? renderCustomIcon : renderIcon;

    return (
        <AlertProcess type={type} closable={closable} onClose={onClose} renderIcon={renderAlertProcessIcon}>
            Допустимое количество сообщений об ошибке — 3. Максимальное количество символов одного сообщения об ошибке — 180 символов.
        </AlertProcess>
    );
};
