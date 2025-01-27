import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {DatePickerExtended, IDatePickerExtendedProps} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtended';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {DatePickerUtils} from '@sberbusiness/triplex/components/DatePicker/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {DatePickerTarget} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerTarget';
import {DatePickerDropdownHeaderTarget} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerDropdownHeaderTarget';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства компонента DatePicker. */
export interface IDatePickerProps
    extends Omit<IDatePickerExtendedProps, 'pickedDate' | 'onDateChange' | 'renderTarget' | 'renderDropdownHeaderTarget'> {
    /** Значение даты. */
    value: string;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderMask?: string;
    /** Неактивное состояние. */
    disabled?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Ссылка на поле ввода. */
    inputRef?: React.Ref<HTMLInputElement>;
    /** Функция, вызывающаяся при изменении значения. */
    onChange: (value: string) => void;
}

/** Компонент ввода и выбора даты. */
export const DatePicker = React.forwardRef<HTMLDivElement, IDatePickerProps>((props, ref) => {
    const {
        className,
        value,
        placeholderMask,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        disabledDays,
        disabled,
        error,
        inputRef,
        onChange,
        onDropdownOpen,
        onDropdownClose,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(DatePickerUtils.getPickerValues(value, format, limitRange, disabledDays));
    const lastValidPickerValuesRef = useRef(pickerValues);
    const inputFocusedRef = useRef(false);
    const dropdownOpenRef = useRef(false);
    const dropdownClosedByCalendarRef = useRef(false); // Dropdown закрыт при выборе даты в календаре

    useEffect(() => {
        const newPickerValues = DatePickerUtils.getPickerValues(value, format, limitRange, disabledDays);

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        lastValidPickerValuesRef.current = newPickerValues;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange, disabledDays]);

    /** Рендер-функция управляющего элемента. */
    const renderTarget = () => (
        <DatePickerTarget>
            <DatePickerTarget.Input
                value={pickerValues.inputString}
                placeholderMask={placeholderMask}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                disabled={disabled}
                error={error}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                ref={inputRef}
            />
            <DatePickerTarget.Button aria-label={ariaLabel} aria-labelledby={ariaLabelledby} disabled={disabled} />
        </DatePickerTarget>
    );

    /** Рендер-функция управляющего элемента в заголовке DropdownMobile. */
    const renderDropdownHeaderTarget = () => (
        <DatePickerDropdownHeaderTarget
            value={pickerValues.inputString}
            placeholderMask={placeholderMask}
            onChange={handleInputChange}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={inputFocusedRef.current}
        />
    );

    /** Обработчик получения фокуса DatePickerTargetInput. */
    const handleInputFocus = () => {
        inputFocusedRef.current = true;
    };

    /** Обработчик потери фокуса DatePickerTargetInput. */
    const handleInputBlur = () => {
        inputFocusedRef.current = false;

        if (!dropdownOpenRef.current) {
            triggerChangeFromInput();
        }
    };

    /** Обработчик изменения значения DatePickerTargetInput. */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = DatePickerUtils.getCalendarDate(event.target.value, inputDateFormat, limitRange, disabledDays);

        setPickerValues({calendarDate: date, inputString: event.target.value});
    };

    /** Обработчик нажатия клавиши DatePickerTargetInput. */
    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, 'ENTER')) {
            triggerChangeFromInput();
        }
    };

    /** Триггер изменения значения из поля ввода. */
    const triggerChangeFromInput = () => {
        if (pickerValues.inputString.length === 0 && value.length !== 0) {
            return onChange(pickerValues.inputString);
        }

        const date = DatePickerUtils.getCalendarDate(pickerValues.inputString, inputDateFormat, limitRange, disabledDays);

        if (date) {
            const newValue = date.format(format);
            if (newValue !== value) {
                onChange(newValue);
            }
        } else {
            // Текущее значение в поле невалидно, возвращаем последнее валидное.
            if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
                setPickerValues(lastValidPickerValuesRef.current);
            }
        }
    };

    /** Обработчик открытия Dropdown. */
    const handleDropdownOpen = () => {
        dropdownOpenRef.current = true;

        onDropdownOpen?.();
    };

    /** Обработчик закрытия Dropdown. */
    const handleDropdownClose = () => {
        dropdownOpenRef.current = false;

        if (dropdownClosedByCalendarRef.current) {
            dropdownClosedByCalendarRef.current = false;
        } else if (!inputFocusedRef.current && pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            triggerChangeFromInput();
        }

        onDropdownClose?.();
    };

    /** Обработчик изменения даты. */
    const handleDateChange = (date: moment.Moment) => {
        dropdownClosedByCalendarRef.current = true;

        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className={classnames('cssClass[datePicker]', className)}
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            limitRange={limitRange}
            disabledDays={disabledDays}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

DatePicker.displayName = 'DatePicker';
