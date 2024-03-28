/* eslint-env node */
const buildTs = require('./ts/buildTs');

(function build() {
    try {
        buildTs();
    } catch (error) {
        console.error(error);
    }
})();
