import React, {useRef} from 'react';
import {IMaskedInputProps, MaskedInput} from '@sbbol/web-library/desktop/components/MaskedInput/MaskedInput';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {defaultDatePlaceholder} from '@sbbol/web-library/desktop/components/DatePicker/const';
import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';

/**
 * @prop {Function} [onFocus] Обработчик фокусировки на элементе.
 * @prop {string} [placeholderAsMask]  Символы для заполнения пустых редактируемых позиций в маске (например, строка
 * вида "дд.мм.гггг").
 */
export interface IDateInputProps extends Omit<IMaskedInputProps, 'mask' | 'ref'> {
    onFocus?: () => void;
    placeholderAsMask?: string;
}

/** Поля ввода для компонента выбора даты. */
export const DateInput: React.FC<IDateInputProps> = ({value, onFocus, placeholderAsMask, focused, error, disabled, ...inputProps}) => {
    const ref = useRef<HTMLInputElement | null>();

    const iconClassNames = classnames({
        'cssClass[calendarIcon]': true,
        'cssClass[focused]': !!focused,
        'cssClass[error]': !!error,
        'cssClass[disabled]': !!disabled,
    });

    /** Обработчик фокусировки на элементе. */
    const handleFocus = (): void => {
        if (!disabled) {
            onFocus?.();
        }
    };

    return (
        <div className="cssClass[inputBlock]">
            <MaskedInput
                {...inputProps}
                value={value}
                onFocus={handleFocus}
                mask="dd.dd.dddd"
                placeholderAsMask={placeholderAsMask || defaultDatePlaceholder}
                overtype={true}
                focused={focused}
                error={error}
                disabled={disabled}
                setRef={(el) => (ref.current = el)}
            />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className={iconClassNames} onClick={handleFocus}>
                <CalendarSrvIcon20 />
            </span>
        </div>
    );
};
