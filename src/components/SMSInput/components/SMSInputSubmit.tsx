import React, {useEffect, useContext} from 'react';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';
import {ButtonIcon, EButtonIconShape} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {SmssignSrvxIcon20} from '@sberbusiness/icons/SmssignSrvxIcon20';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства SMSInput.Submit. */
export interface ISMSInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SMSInputSubmit: React.FC<ISMSInputSubmitProps> = ({className, disabled, onClick, ...restProps}) => {
    const {code, disabled: allDisabled, sizeClassName, onSubmitCode, setDisabledSubmit} = useContext(SMSInputContext);

    const submitDisabled = allDisabled || disabled || code === '';
    const submitClassName = classnames('cssClass[btnSubmit]', sizeClassName);

    useEffect(() => {
        setDisabledSubmit(submitDisabled);
    }, [submitDisabled, setDisabledSubmit]);

    /** Обработчик отправки sms-кода. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSubmitCode(code);
        onClick?.(event);
    };

    return (
        <ButtonIcon
            className={submitClassName}
            disabled={submitDisabled}
            onClick={handleClick}
            shape={EButtonIconShape.CIRCLE}
            {...restProps}
        >
            <SmssignSrvxIcon20 />
        </ButtonIcon>
    );
};
