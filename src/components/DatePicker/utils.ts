import moment from 'moment';
import {TPickedDate} from '@sberbusiness/triplex/components/Calendar/types';
import {IDateLimitRange} from '@sberbusiness/triplex/types/DateTypes';
import {inputDateFormat} from '@sberbusiness/triplex/components/DatePicker/const';
import {isDayDisabled} from '@sberbusiness/triplex/components/Calendar/utils';

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

        if (!date.isValid() || !DatePickerUtils.isAvailableDate(date, value, limitRange, disabledDays)) {
            return null;
        }

        return date;
    },

    /** Является ли дата доступной. */
    isAvailableDate: (date: moment.Moment, value: string, limitRange: IDateLimitRange, disabledDays?: string[]) => {
        return !(date.isBefore(limitRange.dateFrom, 'day') || date.isAfter(limitRange.dateTo, 'day') || isDayDisabled(value, disabledDays));
    },
};
