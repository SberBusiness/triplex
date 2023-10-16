import {dateFormatYYYYMMDD} from '@sberbusiness/triplex/consts/DateConst';
import {Moment} from 'moment';

/**
 * Преобразует дату из Moment в передаваемый формат.
 * @param {Moment} date Дата в формате момента.
 * @param {string} [format] Дата в формате момента.
 */
export const getFormattedDate = (date: Moment, format?: string): string => {
    const isValidDate = Boolean(date) && date.isValid && date.isValid();
    return isValidDate ? date.format(format ? format : dateFormatYYYYMMDD) : '';
};
