/**
 * Возвращает номер счёта в виде XXXXX XXX X XXXX XXXXXXX.
 *
 * @param {string} account Номер счёта.
 * @param {string} errorMessage Сообщение для вывода в случае ошибки.
 * @returns {string} Номер счёта в виде XXXXX XXX X XXXX XXXXXXX.
 */
export function decorate(account: string, errorMessage = '') {
    if (!account) {
        return errorMessage;
    }
    return (
        getAccountNumberBalanceGroup(account) +
        ' ' +
        getAccountNumberCurrencyCode(account) +
        ' ' +
        getAccountNumberControlCode(account) +
        ' ' +
        getAccountNumberBankOfficeCode(account) +
        ' ' +
        getAccountNumberUniqueCode(account)
    );
}
/**
 * Возвращает 5-ти значный номер балансового счёта из номера счёта.
 * @param {string} account Номер счёта.
 * @return {string} балансовый код номера счёта в виде XXXXX.
 */
function getAccountNumberBalanceGroup(account: string) {
    return cleanAccountNumber(account).substring(0, 5);
}
/**
 * Возвращает трёхзначный код валюты счёта из номера счёта.
 * @param {string} account Номер счёта.
 * @return {string} Код валюты счёта в виде XXX.
 */
function getAccountNumberCurrencyCode(account: string) {
    return cleanAccountNumber(account).substring(5, 8);
}
/**
 * Возвращает контрольное число из номера счёта.
 * @param {string} account Номер счёта.
 * @return {string} Контрольное число X из номера счёта.
 */
function getAccountNumberControlCode(account: string) {
    return cleanAccountNumber(account).substring(8, 9);
}
/**
 * Возвращает 4-х значный номер подразделения из номера счёта.
 * @param {string} account Номер счёта.
 * @return {string} Номер подразделения банка в виде XXXX.
 */
function getAccountNumberBankOfficeCode(account: string) {
    return cleanAccountNumber(account).substring(9, 13);
}
/**
 * Возращает 7-ми значный номер лицевого счёта по переданному номеру расчетного номера счёта.
 * @param {string} account Номер счёта.
 * @return {string} Номер лицевого счёта в виде XXXXXXX.
 */
function getAccountNumberUniqueCode(account: string) {
    return cleanAccountNumber(account).substring(13);
}
/**
 * Возвращает номер счёта без лишних символов, только цифры и заглавные буквы латинского алфавита.
 * @param {string} account Номер счёта.
 * @return {string} Номер счёта в виде XXXXXXXXXXXXXXXXXXXX
 */
function cleanAccountNumber(account: string) {
    return JSON.stringify(account).replace(/[^A-Z0-9]/g, '');
}
