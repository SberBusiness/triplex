/* eslint-env node */
const rollup = require('rollup');
const getScriptConfig = require('./getScriptConfig');
const getTsFileList = require('./getTsFileList');

module.exports = function() {
    const fileList = getTsFileList('src/', [/.*types\.ts$/, /.*common\/theme\/.*\.less$/, /__tests__/]);

    let tsIdx = 0;
    let tsCount = fileList.components.length;

    /**
     * Здесь идёт сборка ts-файлов, но начнётся она только после сборки стилей.
     * Это нужно для того, чтобы были заранее посчитаны хэши по файлам.
     */
    function nextTS() {
        if (tsIdx < tsCount) {
            const currentPath = fileList.components[tsIdx];
            const config = getScriptConfig(currentPath);

            rollup.rollup(config.input).then(function(bundle) {
                bundle.generate(config.output).then(function() {
                    bundle.write(config.output).then(nextTS);
                });
            });
            tsIdx++;
        }
    }

    nextTS();
};
