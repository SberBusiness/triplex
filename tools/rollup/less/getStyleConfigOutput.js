/* eslint-env node */
const parseComponentPath = require('../../utils/parseComponentPath');

/**
 * Формирует выходной конфиг для сборки стилей через rollup.
 *
 * @param fileName Наименование файлов (включая его относительное расположение).
 * @param componentName Имя компонента, для переопределения.
 */
module.exports = function(fileName, componentName) {
    const {outPath} = parseComponentPath(fileName, componentName);

    return {
        file: `out/${outPath}.css`,
        format: 'cjs',
        esModule: false,
        freeze: false,
        exports: 'named',
    };
};
