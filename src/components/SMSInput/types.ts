import React from 'react';
import {ESMSInputSize} from './enums';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';

/** Свойства компонента SMSInput. */
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
