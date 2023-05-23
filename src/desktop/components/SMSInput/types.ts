import React from 'react';
import {ESMSInputSize} from './enums';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {TTooltipToggleType} from '@sberbusiness/triplex/desktop/components/Tooltip/types';

/** Свойство компонента SMSInput. */
export interface ISMSInputProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Значение кода. */
    code: string;
    /** Признак блокировки компонента. */
    disabled?: boolean;
    /** Признак наличия ошибки. */
    error?: boolean;
    /** Размер поля. */
    size: ESMSInputSize;
    /** Обработчик изменения кода. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string) => void;
}

/** Свойство компонента SMSInputDeprecated. */
export interface ISMSInputDeprecatedProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Значение кода. */
    code?: string;
    /** Признак блокировки компонента. */
    disabled?: boolean;
    /** Признак блокировки кнопки запроса кода. */
    disabledRefresh?: boolean;
    /** Признак блокировки кнопки отправки кода. */
    disabledSubmit?: boolean;
    /** Признак наличия ошибки. */
    hasError?: boolean;
    /** Признак открыт ли Tooltip.  */
    isTooltipOpen?: boolean;
    /** Максимальное количество символов в инпуте. */
    maxLength?: number;
    /** Сообщение для тултипа. */
    message: string;
    /** Сообщение для тултипа во время обратного отсчета. */
    messageTicking: string;
    /** Обработчик изменения кода. */
    onChangeCode?: (code: string) => void;
    /** Обработчик запроса кода. */
    onRefreshCode: (event?: React.MouseEvent) => void;
    /** Обработчик окончания обратного отсчета. */
    onRefreshTimeout?: () => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
    /** Размер поля. */
    size?: ESMSInputSize; // TODO: Сделать свойство обязательным в ближайшем мажорном релизе.
    /** Задержка повторной отправки СМС кода. */
    smsCountdownTime: number;
    /** Запускать обратный отсчет при маунте компонента. */
    startTimerOnMount?: boolean;
    /** Контролирующая функция закрытия/открытия Tooltip.  */
    toggleTooltip?: (nextExpanded: boolean) => void;
    /** Тип взаимодействия с тултипом. */
    tooltipToggleType?: TTooltipToggleType;
}

/** Состояние компонента SMSInput. */
export interface ISMSInputState {
    /** Введенный код. */
    code: string;
    /** Признак контролируемый ли код. */
    isControlledCode: boolean;
    /** Количество секунд, оставшееся до возможности повторного запроса СМС-кода. */
    smsCountdownTimeLeft: number;
}
