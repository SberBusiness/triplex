import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {DatePickerExtended, IDatePickerExtendedProps} from '@sberbusiness/triplex/components/DatePickerExtended/DatePickerExtended';
import {dateFormatYYYYMMDD, globalLimitRange} from '@sberbusiness/triplex/consts/DateConst';
import {MonthYearPickerUtils} from '@sberbusiness/triplex/components/MonthYearPicker/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {MonthYearPickerTarget} from '@sberbusiness/triplex/components/MonthYearPicker/components/MonthYearPickerTarget';
import {MonthYearPickerDropdownHeaderTarget} from '@sberbusiness/triplex/components/MonthYearPicker/components/MonthYearPickerDropdownHeaderTarget';
import {ECalendarPickType} from '@sberbusiness/triplex/components/Calendar/enums';

/** Свойства компонента MonthYearPicker. */
export interface IMonthYearPickerProps
    extends Omit<IDatePickerExtendedProps, 'pickedDate' | 'onDateChange' | 'renderTarget' | 'renderDropdownHeaderTarget'> {
    /** Значение даты. */
    value: string;
    /** Текст подсказки. */
    placeholder?: string;
    /** Неактивное состояние. */
    disabled?: boolean;
    /** Состояние ошибки. */
    error?: boolean;
    /** Функция, вызывающаяся при изменении значения. */
    onChange: (value: string) => void;
}

/** Поле для выбора месяца */
export const MonthYearPicker = React.forwardRef<HTMLDivElement, IMonthYearPickerProps>((props, ref) => {
    const {
        className,
        value,
        placeholder,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        disabled,
        error,
        onChange,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(MonthYearPickerUtils.getPickerValues(value, format, limitRange));

    useEffect(() => {
        const newPickerValues = MonthYearPickerUtils.getPickerValues(value, format, limitRange);

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange]);

    /** Рендер-функция управляющего элемента. */
    const renderTarget = () => (
        <MonthYearPickerTarget>
            <MonthYearPickerTarget.Input
                value={pickerValues.inputString}
                placeholder={placeholder}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                disabled={disabled}
                error={error}
            />
            <MonthYearPickerTarget.Button disabled={disabled} />
        </MonthYearPickerTarget>
    );

    /** Рендер-функция управляющего элемента в заголовке DropdownMobile. */
    const renderDropdownHeaderTarget = () => {
        return <MonthYearPickerDropdownHeaderTarget value={pickerValues.inputString} placeholder={placeholder} />;
    };

    /** Обработчик выбора даты. */
    const handleDateChange = (date: moment.Moment) => {
        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className={classnames('cssClass[monthYearPicker]', className)}
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            pickType={ECalendarPickType.monthYearPick}
            limitRange={limitRange}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

MonthYearPicker.displayName = 'MonthYearPicker';
