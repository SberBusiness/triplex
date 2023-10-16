import React from 'react';
import {EStepPosition, EStepStatus} from '@sberbusiness/triplex/components/Step/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ETooltipAlign, ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';

export interface IStepMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Номер шага для отображения в кружке. */
    step: number;
    /** Статус текущего шага. */
    status: EStepStatus;
    /** Позиция шага, относительно других. */
    position?: EStepPosition;
}

/** Мапа статуса шага на стилевой класс. */
const statusToCssClassMap = {
    [EStepStatus.WAIT]: 'cssClass[wait]',
    [EStepStatus.WARNING]: 'cssClass[warning]',
    [EStepStatus.ERROR]: 'cssClass[error]',
    [EStepStatus.SUCCESS]: 'cssClass[success]',
    [EStepStatus.DISABLED]: 'cssClass[disabled]',
};

/** Вычисление позиции шага, относительно других. */
export const calcPosition = (stepCount: number, i: number): EStepPosition => {
    if (i === 0) {
        return EStepPosition.XFirst;
    } else if (i + 1 === stepCount) {
        return EStepPosition.XLast;
    } else {
        return EStepPosition.Default;
    }
};

/** Компонент маркера шага (цифра в кружке). */
export const Step: React.FC<IStepMarkerProps> = ({children, className, step, status, position = EStepPosition.Default, ...rest}) => {
    const content = (
        <div {...rest} className={classnames(className, 'cssClass[globalStep]', statusToCssClassMap[status])} style={{}}>
            {step}
        </div>
    );

    let tooltipAlign;
    switch (position) {
        case EStepPosition.XFirst: {
            tooltipAlign = ETooltipAlign.START;
            break;
        }
        case EStepPosition.Default: {
            tooltipAlign = ETooltipAlign.CENTER;
            break;
        }
        case EStepPosition.XLast: {
            tooltipAlign = ETooltipAlign.END;
            break;
        }
    }

    return children ? (
        <Tooltip size={ETooltipSize.SM} toggleType="hover" alignTip={tooltipAlign}>
            <TooltipBody>{children}</TooltipBody>
            <TooltipTarget>{content}</TooltipTarget>
        </Tooltip>
    ) : (
        content
    );
};

Step.displayName = 'Step';
