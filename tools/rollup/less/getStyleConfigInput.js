const postcss = require('rollup-plugin-postcss');
const {getClassName} = require('../../utils/getClassName');
const buildCssPlugin = require('../../plugins/rollup-plugin-build-css');

let shared = {
    content: '',
};

function getPlugins() {
    return [
        postcss({
            plugins: [
                require('postcss-modules')({
                    getJSON: function() {},
                    generateScopedName: function(name, filename) {
                        return getClassName(filename, name);
                    },
                }),
                require('autoprefixer')({
                    env: 'Chrome >= 59 or Edge >= 100 or Safari >= 10 or Firefox >= 50',
                }),
            ],
            inject: false,
            minimize: true,
            use: {
                less: {
                    math: 'always',
                }
            },
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
