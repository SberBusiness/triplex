var fs = require('fs');

/**
 * Рекурсивный обход файлов по каталогам.
 *
 * @param path Путь до каталога/файла.
 * @param iterator Функция-итератор, вызываемая для каждого вхождения.
 * @param iterateMask RegExp-фильтрация, для итерируемого элемента.
 */
module.exports = function forEachFolder({path, iterator, iterateMask}) {
    if (!fs.existsSync(path)) {
        return;
    }

    if (fs.lstatSync(path).isDirectory()) {
        const files = fs.readdirSync(path);

        let i = files.length - 1;
        while (i >= 0) {
            forEachFolder({path: `${path}/${files[i--]}`, iterator, iterateMask});
        }
    } else if (!(iterateMask instanceof RegExp) || iterateMask.test(path)) {
        iterator(path);
    }
};
