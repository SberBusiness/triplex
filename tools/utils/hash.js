const CryptoJS = require('../../src/utils/sha256');

/**
 * Хэширующая функция, используемая для создания хэшей имён классов css.
 */
module.exports = function(str) {
    const hash = CryptoJS.SHA256(str).toString();

    return hash.slice(0, 8);
};
