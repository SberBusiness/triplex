import moment from 'moment';
import {headerDateFormat} from '@sberbusiness/triplex/consts/DateConst';
import {ECalendarViewMode} from '@sberbusiness/triplex/components/Calendar/enums';
import {TPickedDate, TPickedDateProp} from '@sberbusiness/triplex/components/Calendar/types';
import {ICalendarRangeProps, TCalendarProps} from '@sberbusiness/triplex/components/Calendar/Calendar';

/**
 * Приведение даты к типу Moment.
 * @param value Значение.
 * @param format Формат для значения.
 */
export function parsePickedDate(value: TPickedDateProp | undefined, format: string): TPickedDate {
    if (!value) {
        return null;
    } else if (typeof value === 'string') {
        return moment(value, format);
    } else {
        return value;
    }
}

/**
 * Получить актуальный заголовок.
 * @param {TPickedDate} pickedDate Выбранная дата в формате Moment.
 * @param {Moment} [date] Дата для построения заголовка.
 */
export function getHeader(pickedDate: TPickedDate, date?: moment.Moment): string {
    let currentDate;

    if (date && date.isValid()) {
        currentDate = date;
    } else if (pickedDate && pickedDate.isValid()) {
        currentDate = pickedDate;
    } else {
        currentDate = moment();
    }

    return currentDate.format(headerDateFormat);
}

/**
 * Получить текст заголовка из текущей даты.
 * @param viewDate Отображаемая дата.
 * @param viewMode Текущая вкладка.
 */
export function formatDate(viewDate: TPickedDate, viewMode: ECalendarViewMode): string {
    const checkedDate = viewDate ? viewDate : moment();

    switch (viewMode) {
        case ECalendarViewMode.DAYS:
            return getHeader(checkedDate);
        case ECalendarViewMode.MONTHS:
            return checkedDate.clone().format('YYYY');
        case ECalendarViewMode.YEARS: {
            const yearFrom = checkedDate.clone().add(-5, 'y').format('YYYY');
            const yearTo = checkedDate.clone().add(6, 'y').format('YYYY');

            return `${yearFrom} - ${yearTo}`;
        }
    }
}

/** Type guard для проверки свойств календаря на выбор периода. */
export function isCalendarRange(props: TCalendarProps): props is ICalendarRangeProps {
    return Array.isArray(props.pickedDate);
}
