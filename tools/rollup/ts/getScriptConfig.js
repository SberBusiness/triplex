/* eslint-env node */
const packageJson = require('../../../package');
const typescript = require('rollup-plugin-typescript');
const hashReplace = require('../../plugins/rollup-plugin-hash-replace');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const {nodeResolve} = require('@rollup/plugin-node-resolve');

const isProd = process.env.NODE_ENV === 'production';

function getPlugins() {
    return [
        nodeResolve(),
        typescript({
            include: [
                "src/**/*.ts+(|x)",
                "typings/styles.d.ts"
            ],
            exclude: [
                "src/**/*.test.ts+(|x)",
            ],
        }),
        hashReplace(),
        replace({
            preventAssignment: true,
            values: {
                'process.env.npm_package_version': JSON.stringify(packageJson.version),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
            },
        }),
        isProd && terser(),
    ].filter(function(plugin) {
        return !!plugin;
    });
}

const inputPath = 'src/';
const outputPath = 'out/';

function external(id, parentId, isResolved) {
    return (
        id === 'react' ||
        id === 'react-dom' ||
        id === 'tslib' ||
        id === 'moment' ||
        id === 'big.js' ||
        id === 'element-closest' ||
        id === 'react-transition-group' ||
        id === 'react-text-mask' ||
        id === 'focus-trap-react' ||
        id === 'react-resize-detector' ||
        id.indexOf('lodash') === 0 ||
        id.indexOf('@sberbusiness/icons') === 0 ||
        id.indexOf('@sberbusiness/illustrations') === 0 ||
        // Если импорт начинается с нашей либы.
        id.indexOf(packageJson.name) === 0
    );
}

const regexpExtractExt = /(.*)\.tsx?$/;

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
