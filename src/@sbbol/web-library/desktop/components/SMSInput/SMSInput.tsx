import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ArrowRightWhiteIcon20} from '@sbbol/web-library/desktop/common/icons/ArrowRightWhiteIcon20';
import {ISMSInputProps, ISMSInputState} from '@sbbol/web-library/desktop/components/SMSInput/types';
import {RefreshButton} from '@sbbol/web-library/desktop/components/SMSInput/RefreshButton';
import {ETooltipAlign, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import {TooltipBody} from '@sbbol/web-library/desktop/components/Tooltip/TooltipBody';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {TooltipTarget} from '@sbbol/web-library/desktop/components/Tooltip/TooltipTarget';
import {EVENT_KEY_CODES} from '@sbbol/web-library/desktop/utils/keyboard';
import {TestIds} from '../../../common/dataTestIds/dataTestIds';
import * as React from 'react';

/** Компонент для ввода СМС. */
export class SMSInput extends React.PureComponent<ISMSInputProps, ISMSInputState> {
    public static displayName = 'SMSInput';
    public regExp = new RegExp(/^[0-9]*$/);

    public static defaultProps = {
        maxLength: 8,
    };

    public state = {
        code: '',
        smsCountdownTimeLeft: 0,
    };

    private smsIntervalId: number | null = null;

    public componentDidMount(): void {
        if (this.props.startTimerOnMount) {
            this.startCountdown();
        }
    }

    public componentDidUpdate(prevProps: Readonly<ISMSInputProps>): void {
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
            disabled,
            disabledRefresh,
            disabledSubmit,
            hasError,
            message,
            messageTicking,
            onRefreshCode,
            onRefreshTimeout,
            onSubmitCode,
            smsCountdownTime,
            maxLength,
            placeholder,
            ...htmlDivAttributes
        } = this.props;
        const dataTestId = this.props['data-test-id'];
        const {code, smsCountdownTimeLeft} = this.state;

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
        const classBtnSubmit = classnames('cssClass[btnSubmit]', {'cssClass[disabled]': isSubmitDisabled});
        const classBtnRefresh = classnames('cssClass[btnRefresh]', {'cssClass[disabled]': isRefreshDisabled});
        const classInput = classnames('cssClass[input]', {
            'cssClass[error]': Boolean(hasError),
            'cssClass[filled]': code !== '',
        });

        // Приводит оставшееся время к формату mm:ss
        const formattedTimeLeft = new Date(smsCountdownTimeLeft * 1000).toISOString().substr(14, 5);

        const smsMessage = isSmsCountdownTicking ? `${messageTicking} ${formattedTimeLeft}` : message;

        const placeholderText = placeholder || (hasError ? 'Неверный код' : 'Введите код');

        return (
            <div className={classSMSInput} {...htmlDivAttributes}>
                <Tooltip size={ETooltipSize.SM} toggleType="hover" alignTip={ETooltipAlign.START}>
                    <TooltipBody>{smsMessage}</TooltipBody>
                    <TooltipTarget>
                        <div
                            className={classBtnRefresh}
                            data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.button_refresh}`}
                            role="button"
                            tabIndex={0}
                            {...(!isRefreshDisabled && {onClick: this.handleRefresh})}
                        >
                            <RefreshButton percent={percent} />
                        </div>
                    </TooltipTarget>
                </Tooltip>
                <input
                    type="text"
                    maxLength={maxLength}
                    placeholder={placeholderText}
                    className={classInput}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.input}`}
                    autoComplete="off"
                    onChange={this.handleChangeCode}
                    onKeyDown={this.handleKeyDown}
                    value={code}
                    disabled={disabled}
                />
                <div
                    className={classBtnSubmit}
                    data-test-id={dataTestId && `${dataTestId}${TestIds.SMSInput.button_submit}`}
                    {...(!isSubmitDisabled && {onClick: this.handleSubmitCode})}
                >
                    <ArrowRightWhiteIcon20 />
                </div>
            </div>
        );
    }

    private isSubmitDisabled = () => {
        const {disabled, disabledSubmit} = this.props;
        const {code} = this.state;

        return disabled || disabledSubmit || code === '';
    };

    /**
     * Обработчик ввода sms-кода.
     * @param {React.ChangeEvent<HTMLInputElement>} e Событие.
     */
    private handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (this.regExp.test(value)) {
            this.setState({code: value});
        }
    };

    /**
     * Обработчик отправки sms-кода.
     */
    private handleSubmitCode = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (!this.isSubmitDisabled()) {
            this.props.onSubmitCode(this.state.code, event);
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
        this.setState({code: ''});
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
