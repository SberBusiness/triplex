import React, {useState} from 'react';
import {ISMSInputProps} from '@sberbusiness/triplex/components/SMSInput/types';
import {ESMSInputSize} from '@sberbusiness/triplex/components/SMSInput/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SMSInputTooltip} from '@sberbusiness/triplex/components/SMSInput/components/SMSInputTooltip';
import {SMSInputSubmit} from '@sberbusiness/triplex/components/SMSInput/components/SMSInputSubmit';
import {SMSInputInput} from '@sberbusiness/triplex/components/SMSInput/components/SMSInputInput';
import {SMSInputRefresh} from '@sberbusiness/triplex/components/SMSInput/components/SMSInputRefresh';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';

/** Возвращает CSS класс в зависимости от размера. */
const getSizeClassName = (size: ESMSInputSize) => {
    switch (size) {
        case ESMSInputSize.MD:
            return 'cssClass[MD]';
        case ESMSInputSize.SM:
            return 'cssClass[SM]';
    }
};

/** Внутренние составляющие SMSInput. */
interface ISMSInputComposition {
    Tooltip: typeof SMSInputTooltip;
    Refresh: typeof SMSInputRefresh;
    Input: typeof SMSInputInput;
    Submit: typeof SMSInputSubmit;
}

/** Компонент для ввода СМС. */
export const SMSInput: React.FC<ISMSInputProps> & ISMSInputComposition = (props) => {
    const {children, className, code, disabled, error, size, onChangeCode, onSubmitCode, ...htmlDivAttributes} = props;

    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [tooltipId, setTooltipId] = useState<string>();
    const classSMSInput = classnames('cssClass[globalSmsInput]', className);
    const sizeClassName = getSizeClassName(size);

    return (
        <SMSInputContext.Provider
            value={{
                code,
                disabled: !!disabled,
                disabledSubmit,
                error: !!error,
                onChangeCode,
                onSubmitCode,
                setDisabledSubmit,
                setTooltipId,
                sizeClassName,
                tooltipId,
            }}
        >
            <div className={classSMSInput} {...htmlDivAttributes}>
                {children}
            </div>
        </SMSInputContext.Provider>
    );
};

SMSInput.displayName = 'SMSInput';
SMSInput.Tooltip = SMSInputTooltip;
SMSInput.Refresh = SMSInputRefresh;
SMSInput.Input = SMSInputInput;
SMSInput.Submit = SMSInputSubmit;
