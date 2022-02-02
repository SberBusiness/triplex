import {TestProps} from '@sbbol/web-library/desktop/common/types/CoreTypes';
import * as React from 'react';

/** Свойство компонента SMSInput. */
export interface ISMSInputProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Признак блокировки компонента. */
    disabled?: boolean;
    /** Признак блокировки кнопки запроса кода. */
    disabledRefresh?: boolean;
    /** Признак блокировки кнопки отправки кода. */
    disabledSubmit?: boolean;
    /** Признак наличия ошибки. */
    hasError?: boolean;
    /** Максимальное количество символов в инпуте. */
    maxLength?: number;
    /** Сообщение для тултипа. */
    message: string;
    /** Сообщение для тултипа во время обратного отсчета. */
    messageTicking: string;
    /** Обработчик повторного запроса кода. */
    onRefreshCode: (event?: React.MouseEvent) => void;
    /** Обработчик окончания обратного отсчета. */
    onRefreshTimeout?: () => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
    /** Задержка повторной отправки СМС кода. */
    smsCountdownTime: number;
    /** Запускать обратный отсчет при маунте компонента. */
    startTimerOnMount?: boolean;
}

/** Состояние компонента SMSInput. */
export interface ISMSInputState {
    /** Введенный код. */
    code: string;
    /** Количество секунд, оставшееся до возможности повторного запроса СМС-кода. */
    smsCountdownTimeLeft: number;
}
