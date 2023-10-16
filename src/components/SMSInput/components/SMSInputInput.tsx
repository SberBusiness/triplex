import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import React, {useContext} from 'react';
import {SMSInputContext} from '@sberbusiness/triplex/components/SMSInput/SMSInputContext';

/** Свойства SMSInput.Input. */
export interface ISMSInputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const regExp = new RegExp(/^[0-9]*$/);

export const SMSInputInput = React.forwardRef<HTMLInputElement, ISMSInputInputProps>(
    ({className, disabled, maxLength = 8, placeholder, onChange, onKeyDown, ...restProps}, ref) => {
        const {code, disabled: allDisabled, disabledSubmit, error, sizeClassName, onChangeCode, onSubmitCode} = useContext(SMSInputContext);

        const inputDisabled = allDisabled || disabled;
        const inputClassName = classnames('cssClass[input]', sizeClassName, className, {'cssClass[error]': error});
        const placeholderText = placeholder || (error ? 'Неверный код' : 'Введите код');

        /** Обработчик ввода sms-кода. */
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (!regExp.test(value)) {
                return;
            }
            onChangeCode(value);
            onChange?.(e);
        };

        /** Обработчик нажатия клавиши Enter (для отправки sms-кода). */
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === EVENT_KEY_CODES.ENTER && !disabledSubmit) {
                onSubmitCode(code);
            }
            onKeyDown?.(e);
        };

        return (
            <Input
                ref={ref}
                autoComplete="off"
                className={inputClassName}
                disabled={inputDisabled}
                maxLength={maxLength}
                placeholder={placeholderText}
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
        );
    }
);
