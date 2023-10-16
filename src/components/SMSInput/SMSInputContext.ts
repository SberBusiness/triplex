import React from 'react';

export interface ISMSInputContext {
    /** Значение кода. */
    code: string;
    /** Признак блокировки компонента. */
    disabled: boolean;
    /** Отключённое состояние кнопки Submit. */
    disabledSubmit: boolean;
    /** Признак наличия ошибки. */
    error: boolean;
    /** CSS класс размера. */
    sizeClassName: string;
    /** Уникальный идентификатор Tooltip. */
    tooltipId?: string;
    /** Обработчик изменения кода. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string) => void;
    /** Установить отключённое состояние кнопки Submit. */
    setDisabledSubmit: (disabled: boolean) => void;
    /** Установить уникальный идентификатор Tooltip. */
    setTooltipId: (id: string) => void;
}

const contextInitial: ISMSInputContext = {
    code: '',
    disabled: false,
    disabledSubmit: true,
    error: false,
    sizeClassName: '',
    tooltipId: undefined,
    onChangeCode: () => {},
    onSubmitCode: () => {},
    setDisabledSubmit: () => {},
    setTooltipId: () => {},
};

export const SMSInputContext = React.createContext(contextInitial);
