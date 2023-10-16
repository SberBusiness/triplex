import React, {useEffect, useContext} from 'react';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';
import {ETooltipAlign, ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/types';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства SMSInput.Tooltip. */
export interface ISMSInputTooltipProps extends Partial<Omit<ITooltipProps, 'children'>>, TestProps {
    children: React.ReactElement;
    /** Текст тултипа. */
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
        <Tooltip id={tooltipId} alignTip={ETooltipAlign.START} size={ETooltipSize.SM} toggleType="hover" {...restProps}>
            <TooltipBody>{message}</TooltipBody>
            <TooltipTarget>{children}</TooltipTarget>
        </Tooltip>
    );
};
