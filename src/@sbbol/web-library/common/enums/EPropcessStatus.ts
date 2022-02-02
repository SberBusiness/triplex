/**
 * Общий формат статуса процесса.
 *
 * 0 (IDLE) - Инициализационное состояние, ничего не делается.
 * 1 (RUNNING) - Идет процесс...
 * 2 (SUCCESS) - Успешное завершение процесса.
 * 3 (FAIL) - Процесс завершен с ошибкой.
 * 4 (CANCELED) - Процесс отменен.
 *
 * @deprecated Использовать npm-пакет @sbbol/bts-navigator.
 */
export enum EProcessStatus {
    IDLE,
    RUNNING,
    SUCCESS,
    FAIL,
    CANCELED,
}
