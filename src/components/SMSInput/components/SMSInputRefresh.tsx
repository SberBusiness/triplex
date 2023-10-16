import React, {useContext, useMemo} from 'react';
import {ButtonIcon, EButtonIconShape} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {RefreshIcon} from '@sberbusiness/triplex/components/SMSInput/RefreshIcon';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства SMSInput.Refresh. */
export interface ISMSInputRefreshProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Число секунд обратного отсчета. */
    countdownTime: number;
    /** Число оставшихся секунд обратного отсчета. */
    countdownTimeLeft: number;
    /** Обработчик запроса кода. */
    onRefresh: () => void;
}

export const SMSInputRefresh: React.FC<ISMSInputRefreshProps> = ({
    className,
    disabled,
    countdownTime,
    countdownTimeLeft,
    onClick,
    onRefresh,
    ...restProps
}) => {
    const {disabled: allDisabled, error, sizeClassName, tooltipId} = useContext(SMSInputContext);

    const isSmsCountdownTicking = countdownTimeLeft > 0;
    const refreshDisabled = (allDisabled && !error) || disabled || isSmsCountdownTicking;
    const refreshClassName = classnames('cssClass[btnRefresh]', sizeClassName, className, {'cssClass[disabled]': refreshDisabled});

    // Проценты выражаются в долях единицы.
    const percent = useMemo(() => {
        if (countdownTimeLeft >= countdownTime) {
            return 0;
        } else {
            return (countdownTime - countdownTimeLeft) / countdownTime;
        }
    }, [countdownTime, countdownTimeLeft]);

    /** Обработчик запроса sms-кода. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // В нативном состоянии disabled, кнопка перестаёт реагировать на события мыши (не показывается Tooltip), поэтому проверяем здесь.
        if (!refreshDisabled) {
            onRefresh();
            onClick?.(event);
        }
    };

    return (
        <ButtonIcon
            className={refreshClassName}
            aria-describedby={tooltipId}
            aria-disabled={refreshDisabled}
            onClick={handleClick}
            shape={EButtonIconShape.CIRCLE}
            {...restProps}
        >
            <RefreshIcon percent={percent} />
        </ButtonIcon>
    );
};
