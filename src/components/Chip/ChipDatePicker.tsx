import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {IDatePickerProps} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {IChipProps} from '@sberbusiness/triplex/components/Chip/Chip';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {DatePickerUtils} from '@sberbusiness/triplex/components/DatePicker/utils';
import {DatePickerExtended} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtended';
import {ChipDatePickerTarget} from '@sberbusiness/triplex/components/Chip/components/ChipDatePickerTarget';
import {DatePickerDropdownHeaderTarget} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerDropdownHeaderTarget';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';

/** Свойства компонента ChipDatePicker. */
export interface IChipDatePickerProps extends Omit<IDatePickerProps, 'invalidDateHint'>, Pick<IChipProps, 'disabled'> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/** DatePicker с видом компонента Chip. */
export const ChipDatePicker = React.forwardRef<HTMLDivElement, IChipDatePickerProps>((props, ref) => {
    const {
        value,
        label,
        placeholderMask,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        disabledDays,
        disabled,
        displayedValue,
        onChange,
        onDropdownOpen,
        onDropdownClose,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(DatePickerUtils.getPickerValues(value, format, limitRange, disabledDays));
    const lastValidPickerValuesRef = useRef(pickerValues);
    const dropdownOpenRef = useRef(false);
    const dropdownClosedByCalendarRef = useRef(false); // Dropdown закрылся от выбора даты в календаре

    useEffect(() => {
        const newPickerValues = DatePickerUtils.getPickerValues(value, format, limitRange, disabledDays);

        lastValidPickerValuesRef.current = newPickerValues;

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange, disabledDays]);

    /** Рендер управляющего элемента. */
    const renderTarget = () => {
        // При открытом Dropdown фиксируем отображаемое значение, чтобы при работе с полем ввода оно не менялось.
        const currentPickerValues = dropdownOpenRef.current ? lastValidPickerValuesRef.current : pickerValues;
        const selected = currentPickerValues.calendarDate !== null;

        return (
            <ChipDatePickerTarget selected={selected} disabled={disabled} onClear={handleClear}>
                {selected ? displayedValue ?? currentPickerValues.inputString : label}
            </ChipDatePickerTarget>
        );
    };

    /** Обработчик сброса значения. */
    const handleClear = () => {
        onChange('');
    };

    /** Рендер целевого элемента в заголовке DropdownMobile. */
    const renderDropdownHeaderTarget = () => (
        <DatePickerDropdownHeaderTarget value={pickerValues.inputString} placeholderMask={placeholderMask} onChange={handleInputChange} />
    );

    /** Обработчик изменения значения ChipDatePickerHeaderTarget. */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let date: moment.Moment | null = null;

        if (event.target.value.length === inputDateFormat.length) {
            date = moment(event.target.value, inputDateFormat, true);

            if (!date.isValid() || !DatePickerUtils.isAvailableDate(date, date.format(format), limitRange, disabledDays)) {
                date = null;
            }
        }

        setPickerValues({calendarDate: date, inputString: event.target.value});
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
        } else if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            triggerChangeFromInput();
        }

        onDropdownClose?.();
    };

    /** Триггер изменения значения из поля ввода. */
    const triggerChangeFromInput = () => {
        if (pickerValues.inputString.length === 0 && value.length !== 0) {
            return onChange(pickerValues.inputString);
        }

        const date = moment(pickerValues.inputString, inputDateFormat, true);

        if (date.isValid()) {
            const newValue = date.format(format);

            if (newValue === value) {
                return;
            }

            if (DatePickerUtils.isAvailableDate(date, newValue, limitRange, disabledDays)) {
                return onChange(newValue);
            }
        }

        // Текущее значение в поле невалидно, возвращаем последнее валидное.
        if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            setPickerValues(lastValidPickerValuesRef.current);
        }
    };

    /** Обработчик изменения даты. */
    const handleDateChange = (date: moment.Moment) => {
        dropdownClosedByCalendarRef.current = true;

        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className="cssClass[chipGroupItem]"
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            format={format}
            limitRange={limitRange}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

ChipDatePicker.displayName = 'ChipDatePicker';
