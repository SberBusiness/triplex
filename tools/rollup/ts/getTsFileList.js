/* eslint-env node */
const forEachFolder = require('../../utils/forEachFolder');

const typescriptRegEx = /.*\.tsx?$/;
const componentsKey = 'components';

let rxLeftPart = null;
let excludeRegexArray = null;
let result = {};

function isExcluded(filePath) {
    return excludeRegexArray.some((regExpExclude) => {
        return regExpExclude instanceof RegExp && regExpExclude.test(filePath);
    });
}

function scanTypescript(tsFilePath) {
    result[componentsKey] = result[componentsKey] || [];
    const componentPath = tsFilePath.replace(rxLeftPart, '');
    result[componentsKey].push(componentPath);
}

/**
 * Получаем список ts-файлов и рассортировываем их согласно конфигу.
 *
 * @param path Путь до папки, в которой нужно рекурсивно получить список файлов.
 * @param exclude Массив регулярных выражений, по которым файлы исключаются из выборки.
 * @return  Key-value объект, где ключ соответствует ключу, переданному в конфиге, а значение - массив путей файлов.
 */
module.exports = function(path, exclude) {
    rxLeftPart = new RegExp('^' + path.replace(/[\\\/]/g, '[\\\\\\/]') + '\\/?');
    excludeRegexArray = exclude;

    forEachFolder({
        path: path,
        iterator: (filePath) => {
            if (isExcluded(filePath)) {
                return;
            }

            if (typescriptRegEx.test(filePath)) {
                scanTypescript(filePath);
            }
        },
    });

    return result;
};
