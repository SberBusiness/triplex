import {Moment} from 'moment';

/**
 * Интерфейс на диапозон выбираемых дат.
 * @prop {Moment} [dateFrom] Дата начала периода.
 * @prop {Moment} [dateTo] Дата конца периода.
 */
export interface IDateLimitRange {
    dateFrom?: Moment;
    dateTo?: Moment;
}
