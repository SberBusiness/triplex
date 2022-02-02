const typescript = require('rollup-plugin-typescript');
const hashReplace = require('../../plugins/rollup-plugin-hash-replace');
const regexpExtractExt = /(.*)\.tsx?$/;
const {terser} = require('rollup-plugin-terser');
const replace = require('@rollup/plugin-replace');

const isProd = process.env.NODE_ENV === 'production';

function getPlugins() {
    return [
        typescript({
            target: 'es5',
            importHelpers: true,
        }),
        hashReplace(),
        replace({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
            },
        }),
        isProd && terser(),
    ].filter(function(plugin) {
        return !!plugin;
    });
}

const inputPath = 'src/@sbbol/web-library/';
const outputPath = 'out/@sbbol/web-library/';

function external(id, parentId, isResolved) {
    return (
        id === 'react' ||
        id === 'react-dom' ||
        id === 'tslib' ||
        id === 'moment' ||
        id === 'big.js' ||
        id === 'react-transition-group' ||
        id.indexOf('lodash.') === 0 ||
        id.indexOf('@sberbusiness/icons') === 0 ||
        id.indexOf('@sbbol/web-librar') === 0
    ); // Если импорт начинается с нашей либы.
}

module.exports = function(name) {
    return {
        input: {
            input: inputPath + name,
            plugins: getPlugins(),
            external: external,
        },
        output: {
            file: outputPath + regexpExtractExt.exec(name)[1] + '.js',
            format: 'es',
            esModule: false,
            freeze: false,
        },
    };
};
