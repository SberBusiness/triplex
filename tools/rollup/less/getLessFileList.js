const forEachFolder = require('../../utils/forEachFolder');
const parseComponentPath = require('../../utils/parseComponentPath');

const stylesRegEx = /.*\.less$/;

function isExcluded(filePath, excludes) {
    return excludes.some((regExpExclude) => {
        return regExpExclude instanceof RegExp && regExpExclude.test(filePath);
    });
}

function iterator(result, excludes, lessPath) {
    if (isExcluded(lessPath, excludes)) {
        return;
    }

    const {platform, componentName} = parseComponentPath(lessPath);

    result[platform] = result[platform] || {};
    result[platform][componentName] = result[platform][componentName] || [];
    result[platform][componentName].push(lessPath);
}

/**
 * Получаем список less-файлов и рассортировываем их согласно конфигу.
 *
 * @param paths Пути до каталогов, в которых нужно рекурсивно получить список файлов.
 * @param excludes Массив регулярных выражений, по которым файлы исключаются из выборки.
 * @return  Key-value объект, где ключ соответствует названию компонента, а значение - массив путей less-файлов.
 */
module.exports = function(paths, excludes) {
    let result = {};

    paths.forEach((p) => {
        const argv = {path: p, iterator: iterator.bind(null, result, excludes), iterateMask: stylesRegEx};
        forEachFolder(argv);
    });

    return result;
};
