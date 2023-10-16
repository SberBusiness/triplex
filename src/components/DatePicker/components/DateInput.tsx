import React, {useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {CalendarSrvIcon20} from '@sberbusiness/icons/CalendarSrvIcon20';
import {IMaskedInputProps, MaskedInput} from '../../MaskedInput/MaskedInput';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';

/** Свойство DateInput. */
export interface IDateInputProps extends Omit<IMaskedInputProps, 'mask' | 'ref'> {
    /** Состояние фокусировки элемента. */
    focused?: boolean;
    /** Обработчик фокусировки на элементе. */
    onFocus?: () => void;
    /** Обработчик клика на иконку календаря. */
    onClickIcon: () => void;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderAsMask?: string;
}

/** Поля ввода для компонента выбора даты. */
export const DateInput: React.FC<IDateInputProps> = ({
    className,
    disabled,
    error,
    focused,
    onFocus,
    placeholderAsMask,
    onClickIcon,
    ...inputProps
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const classNames = classnames('cssClass[dateInput]', {'cssClass[focused]': !!focused}, className);

    /** Обработчик фокусировки на элементе. */
    const handleFocus = (): void => {
        if (!disabled) {
            onFocus?.();
        }
    };

    const renderCalendarIcon = () => {
        const classNames = classnames('cssClass[calendarIcon]', {
            'cssClass[disabled]': !!disabled,
            'cssClass[error]': !!error,
            'cssClass[focused]': !!focused,
        });

        return (
            <ButtonIcon className={classNames} onClick={onClickIcon} aria-label={inputProps['aria-label']}>
                <CalendarSrvIcon20 />
            </ButtonIcon>
        );
    };

    return (
        <div className="cssClass[inputBlock]">
            <MaskedInput
                className={classNames}
                {...inputProps}
                onFocus={handleFocus}
                mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                placeholderMask={placeholderAsMask || MaskedInput.presets.placeholderMasks.date}
                error={error}
                disabled={disabled}
                forwardRef={ref}
            />
            {renderCalendarIcon()}
        </div>
    );
};
