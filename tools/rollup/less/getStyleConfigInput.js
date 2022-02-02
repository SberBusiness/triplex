const postcss = require('rollup-plugin-postcss-modules').default;
const autoprefixer = require('autoprefixer');
const {getClassName} = require('../../utils/getClassName');
const buildCssPlugin = require('../../plugins/rollup-plugin-build-css');

let shared = {
    content: '',
};

function getPlugins() {
    return [
        postcss({
            writeDefinitions: false,
            extract: false,
            inject: false,
            minimize: true,
            modules: {
                generateScopedName: function(name, filename, _css) {
                    return getClassName(filename, name);
                },
            },
            plugins: [
                autoprefixer({
                    env: 'Chrome >= 59 or ff >= 68 or Safari >= 10 or ie >= 11 or Edge >= 17',
                }),
            ],
        }),
        buildCssPlugin(shared),
    ];
}

const plugins = getPlugins();

/**
 * Формирует входной конфиг для сборки стилей через rollup.
 *
 * @param fileName Наименование файлов (включая его относительное расположение).
 */
module.exports = function(fileName) {
    return {
        input: {
            input: fileName,
            plugins,
        },
        shared: shared,
    };
};
