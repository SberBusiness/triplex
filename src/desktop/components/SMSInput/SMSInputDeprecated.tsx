import * as React from 'react';
import {ISMSInputDeprecatedProps, ISMSInputState} from '@sberbusiness/triplex/desktop/components/SMSInput/types';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import {ETooltipAlign, ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipTarget';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {RefreshIcon} from '@sberbusiness/triplex/desktop/components/SMSInput/RefreshIcon';
import {ButtonIcon, EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {SmssignSrvxIcon20} from '@sberbusiness/icons/SmssignSrvxIcon20';
import {TestIds} from '@sberbusiness/triplex/common/dataTestIds/dataTestIds';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';

/** Возвращает CSS класс в зависимости от размера. */
const getSizeClassName = (size?: ESMSInputSize) => {
    switch (size) {
        case ESMSInputSize.MD:
            return 'cssClass[MD]';
        case ESMSInputSize.SM:
            return 'cssClass[SM]';
    }
};

/** Компонент для ввода СМС. */
export class SMSInputDeprecated extends React.PureComponent<ISMSInputDeprecatedProps, ISMSInputState> {
    public static displayName = 'SMSInput';
    public regExp = new RegExp(/^[0-9]*$/);

    public static defaultProps = {
        maxLength: 8,
        size: ESMSInputSize.MD,
    };

    public state = {
        code: '',
        isControlledCode: this.props.code !== undefined && this.props.onChangeCode !== undefined,
        smsCountdownTimeLeft: 0,
    };

    private smsIntervalId: number | null = null;

    public componentDidMount(): void {
        if (this.props.startTimerOnMount) {
            this.startCountdown();
        }
    }

    public componentDidUpdate(prevProps: Readonly<ISMSInputDeprecatedProps>): void {
        if (this.state.isControlledCode) {
            return;
        }
        if (prevProps.disabledSubmit && !this.props.disabledSubmit && this.props.hasError) {
            this.setState({code: ''});
        }
    }

    public componentWillUnmount(): void {
        if (this.smsIntervalId) {
            clearInterval(this.smsIntervalId);
        }
    }

    public render(): JSX.Element {
        const {
            className,
            code: propsCode,
            disabled,
            disabledRefresh,
            disabledSubmit,
            hasError,
            isTooltipOpen,
            message,
            messageTicking,
            onRefreshCode,
            onRefreshTimeout,
            onSubmitCode,
            size,
            smsCountdownTime,
            maxLength,
            placeholder,
            onChangeCode,
            toggleTooltip,
            tooltipToggleType,
            ...htmlDivAttributes
        } = this.props;
        const dataTestId = this.props['data-test-id'];
        const {smsCountdownTimeLeft} = this.state;
        const code = this.getCode();

        const isSubmitDisabled = this.isSubmitDisabled();

        let percent = 1; // Проценты выражаются в долях единицы.
        if (smsCountdownTimeLeft && smsCountdownTime) {
            if (smsCountdownTimeLeft >= smsCountdownTime) {
                percent = 0;
            } else {
                percent = (smsCountdownTime - smsCountdownTimeLeft) / smsCountdownTime;
            }
        }

        const isSmsCountdownTicking = smsCountdownTimeLeft > 0;

        const isRefreshDisabled = (disabled && !hasError) || disabledRefresh || isSmsCountdownTicking;

        const classSMSInput = classnames(className, 'cssClass[globalSmsInput]');
        const classBtnSubmit = classnames('cssClass[btnSubmit]', getSizeClassName(size), {'cssClass[disabled]': isSubmitDisabled});
        const classBtnRefresh = classnames('cssClass[btnRefresh]', getSizeClassName(size), {'cssClass[disabled]': isRefreshDisabled});
        const classInput = classnames('cssClass[input]', getSizeClassName(size), {
            'cssClass[error]': Boolean(hasError),
            'cssClass[filled]': code !== '',
        });

        // Приводит оставшееся время к формату mm:ss
        const formattedTimeLeft = new Date(smsCountdownTimeLeft * 1000).toISOString().substr(14, 5);

        const smsMessage = isSmsCountdownTicking ? `${messageTicking} ${formattedTimeLeft}` : message;

        const placeholderText = placeholder || (hasError ? 'Неверный код' : 'Введите код');

        return (
            <div className={classSMSInput} {...htmlDivAttributes}>
                <Tooltip
                    size={ETooltipSize.SM}
                    toggleType={tooltipToggleType || 'hover'}
                    alignTip={ETooltipAlign.START}
                    isOpen={isTooltipOpen}
                    toggle={toggleTooltip}
                >
                    <TooltipBody>{smsMessage}</TooltipBody>
                    <TooltipTarget>
                        <div
                            className={classBtnRefresh}
                            data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.button_refresh}`}
                            role="button"
                            tabIndex={0}
                            {...(!isRefreshDisabled && {onClick: this.handleRefresh})}
                        >
                            <RefreshIcon percent={percent} />
                        </div>
                    </TooltipTarget>
                </Tooltip>
                <Input
                    className={classInput}
                    value={code}
                    placeholder={placeholderText}
                    maxLength={maxLength}
                    autoComplete="off"
                    onChange={this.handleChangeCode}
                    onKeyDown={this.handleKeyDown}
                    disabled={disabled}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.input}`}
                />
                <ButtonIcon
                    className={classBtnSubmit}
                    disabled={isSubmitDisabled}
                    onClick={this.handleSubmitCode}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.button_submit}`}
                    shape={EButtonIconShape.CIRCLE}
                >
                    <SmssignSrvxIcon20 />
                </ButtonIcon>
            </div>
        );
    }

    private getCode = (): string => {
        const {code: stateCode, isControlledCode} = this.state;
        const {code: propsCode} = this.props;
        return isControlledCode ? propsCode! : stateCode;
    };

    private setCode = (code: string) => {
        if (!this.regExp.test(code)) {
            return;
        }

        if (this.state.isControlledCode) {
            this.props.onChangeCode?.(code);
        } else {
            this.setState({code});
        }
    };

    private isSubmitDisabled = () => {
        const {disabled, disabledSubmit} = this.props;
        const code = this.getCode();

        return disabled || disabledSubmit || code === '';
    };

    /**
     * Обработчик ввода sms-кода.
     * @param {React.ChangeEvent<HTMLInputElement>} e Событие.
     */
    private handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setCode(value);
    };

    /**
     * Обработчик отправки sms-кода.
     */
    private handleSubmitCode = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (!this.isSubmitDisabled()) {
            this.props.onSubmitCode(this.getCode(), event);
        }
    };

    /**
     * Обработчик нажатия клавиши Enter (для отправки СМС-кода).
     */
    private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === EVENT_KEY_CODES.ENTER) {
            this.handleSubmitCode(event);
        }
    };

    /**
     * Обработчик запроса нового sms-кода.
     */
    private handleRefresh = (event: React.MouseEvent) => {
        this.props.onRefreshCode(event);
        this.setCode('');
        this.startCountdown();
    };

    /**
     * Запуск обратного отсчета.
     */
    private startCountdown = () => {
        this.smsIntervalId = window.setInterval(this.intervalChange, 1000);
        this.setState({smsCountdownTimeLeft: this.props.smsCountdownTime});
    };

    /**
     * Ежесекундный коллбэк.
     */
    private intervalChange = () => {
        this.setState(
            (prevState) => ({smsCountdownTimeLeft: prevState.smsCountdownTimeLeft - 1}),
            () => {
                const timerExpired = this.state.smsCountdownTimeLeft <= 0;
                if (timerExpired) {
                    if (this.props.onRefreshTimeout) {
                        this.props.onRefreshTimeout();
                    }
                    clearInterval(this.smsIntervalId!);
                }
            }
        );
    };
}
