import React, {useEffect, useContext} from 'react';
import {SMSInputContext} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInputContext';
import {ETooltipAlign, ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipTarget';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {ITooltipProps} from '@sberbusiness/triplex/desktop/components/Tooltip/types';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';

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
