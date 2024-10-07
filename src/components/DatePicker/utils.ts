import moment from 'moment';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';

/** Значения DatePicker. */
interface IDatePickerValues {
    inputString: string;
    calendarDate: TPickedDate;
}

/** Утилиты для компонента DatePicker. */
export const DatePickerUtils = {
    /** Получить значения пикера. */
    getPickerValues: (value: string, format: string, limitRange: IDateLimitRange, disabledDays?: string[]): IDatePickerValues => {
        if (value.length === 0) {
            return {calendarDate: null, inputString: ''};
        }

        const date = DatePickerUtils.getCalendarDate(value, format, limitRange, disabledDays);

        if (date === null) {
            return {calendarDate: null, inputString: ''};
        }

        return {calendarDate: date, inputString: date.format(inputDateFormat)};
    },

    /** Получить календарную дату. */
    getCalendarDate: (value: string, format: string, limitRange: IDateLimitRange, disabledDays?: string[]) => {
        const date = moment(value, format, true);

        if (
            !date.isValid() ||
            date.isBefore(limitRange.dateFrom, 'day') ||
            date.isAfter(limitRange.dateTo, 'day') ||
            disabledDays?.includes(value)
        ) {
            return null;
        }

        return date;
    },
};
