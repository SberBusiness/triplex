const buildTs = require('./ts/buildTs');

(function build() {
    try {
        buildTs();
        console.log('Build ts successful!');
    } catch (e) {
        console.error(e);
    }
})();
