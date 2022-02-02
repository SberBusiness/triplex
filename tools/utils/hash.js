const sjcl = require('sjcl');

/**
 * Хэширующая функция, используемая для создания хэшей имён классов css.
 */
module.exports = function(str) {
    const bitArray = sjcl.hash.sha256.hash(str);
    const hash = sjcl.codec.hex.fromBits(bitArray);
    return hash.slice(0, 8);
};
