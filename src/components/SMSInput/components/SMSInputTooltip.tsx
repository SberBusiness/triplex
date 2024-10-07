import React, {useEffect, useContext} from 'react';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';
import {ETooltipAlign, ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Tooltip, ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства SMSInput.Tooltip. */
export interface ISMSInputTooltipProps extends Partial<Omit<ITooltipProps, 'children'>>, TestProps {
    children: React.ReactElement;
    /** Текст подсказки. */
    message: string;
}

export const SMSInputTooltip: React.FC<ISMSInputTooltipProps> = ({children, id, message, ...restProps}) => {
    const {tooltipId, setTooltipId} = useContext(SMSInputContext);

    useEffect(() => {
        if (id === undefined) {
            setTooltipId(uniqueId());
        } else if (id !== tooltipId) {
            setTooltipId(id);
        }
    }, [id]);

    return (
        <Tooltip id={tooltipId} alignTip={ETooltipAlign.START} size={ETooltipSize.SM} toggleType="hover" disableAdaptiveMode {...restProps}>
            <Tooltip.Body>{message}</Tooltip.Body>
            <Tooltip.Target>{children}</Tooltip.Target>
        </Tooltip>
    );
};
