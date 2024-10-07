import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {ChipscaretdownSrvxIcon24} from '@sberbusiness/icons/ChipscaretdownSrvxIcon24';
import {IDatePickerProps} from '@sberbusiness/triplex/components/DatePicker/DatePicker';
import {IChipProps} from '@sberbusiness/triplex/components/Chip/Chip';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {DatePickerUtils} from '@sberbusiness/triplex/components/DatePicker/utils';
import {DatePickerExtended} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtended';
import {ChipDatePickerTarget} from '@sberbusiness/triplex/components/Chip/components/ChipDatePickerTarget';
import {ChipClearButton} from '@sberbusiness/triplex/components/Chip/ChipClearButton';
import {DatePickerDropdownHeaderTarget} from '@sberbusiness/triplex/components/DatePicker/components/DatePickerDropdownHeaderTarget';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента ChipDatePicker. */
export interface IChipDatePickerProps extends IDatePickerProps, Pick<IChipProps, 'disabled'> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
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
        onChange,
        onDropdownOpen,
        onDropdownClose,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(DatePickerUtils.getPickerValues(value, format, limitRange, disabledDays));
    const lastValidPickerValuesRef = useRef(pickerValues);
    const targetRef = useRef<HTMLSpanElement>(null);
    const [dropdownOpened, setDropdownOpened] = useState(false);

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
        const currentPickerValues = dropdownOpened ? lastValidPickerValuesRef.current : pickerValues;
        const selected = currentPickerValues.calendarDate !== null;

        if (selected) {
            return (
                <ChipDatePickerTarget postfix={renderChipClearButton()} selected={selected} disabled={disabled} ref={targetRef}>
                    {currentPickerValues.inputString}
                </ChipDatePickerTarget>
            );
        } else {
            return (
                <ChipDatePickerTarget
                    postfix={
                        <ChipscaretdownSrvxIcon24
                            className={classnames('cssClass[caretIcon]', {'cssClass[caretIconOpened]': dropdownOpened})}
                        />
                    }
                    selected={selected}
                    disabled={disabled}
                    ref={targetRef}
                >
                    {label}
                </ChipDatePickerTarget>
            );
        }
    };

    /** Рендер кнопки отмены выбора Chip. */
    const renderChipClearButton = () => <ChipClearButton onKeyDown={handleKeyDownClearButton} onClick={handleClickClearButton} />;

    /** Обработчик клика ChipClearButton. */
    const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        targetRef.current!.focus();
        onChange('');
    };

    /** Обработчик нажатия клавиши ChipClearButton. */
    const handleKeyDownClearButton = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    /** Рендер целевого элемента в заголовке DropdownMobile. */
    const renderDropdownHeaderTarget = () => (
        <DatePickerDropdownHeaderTarget value={pickerValues.inputString} placeholderMask={placeholderMask} onChange={handleInputChange} />
    );

    /** Обработчик изменения значения ChipDatePickerHeaderTarget. */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = DatePickerUtils.getCalendarDate(event.target.value, inputDateFormat, limitRange, disabledDays);

        setPickerValues({calendarDate: date, inputString: event.target.value});
    };

    /** Обработчик открытия Dropdown. */
    const handleDropdownOpen = () => {
        setDropdownOpened(true);

        onDropdownOpen?.();
    };

    /** Обработчик закрытия Dropdown. */
    const handleDropdownClose = () => {
        setDropdownOpened(false);

        if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            triggerChangeFromInput();
        }

        onDropdownClose?.();
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

    /** Обработчик изменения даты. */
    const handleDateChange = (date: moment.Moment) => {
        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className="cssClass[chipGroupItem]"
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

ChipDatePicker.displayName = 'ChipDatePicker';
