const hash = require('./hash');
const {version} = require('../../package');

const regExpFileName = /([\/\\]|^)components[\/\\](\w+)[\/\\].*/;

/**
 * Генерация имени класса с хэшем.
 * Суть в том, что для генерации хэша используется имя файла без пути и расширения, имя класса и версия библиотеки.
 * Исключение состявляют классы начинающиеся с [theme__, scroll-, service-fill]...
 * theme__ остаётся неизменен для возможности переключения темы через уровень выше.
 *
 * @param {string} fileName Имя файла, в котором используется класс.
 * @param {string} className Исходное имя класса.
 * @return {string} Новое имя класса, уже с хэшем.
 */
function getClassName(fileName, className) {
    const componentName = regExpFileName.exec(fileName)[2];

    if (componentName === 'Icons') {
        return className;
    }

    // ^scroll-\d для зависимых от ширины скролла классов, в SBBOL на html намешивается класс scroll-{n}
    // service-fill - класс внутри svg иконок
    // Transition-exit для react-transition-group
    if (className.match(/(^scroll-\d|table-icon|service-fill|no-hash|Transition-exit$)/)) {
        return className;
    }

    // если класс начинается с global, то этот класс можно использовать внутри других компонентов.
    if (className.indexOf('global') === 0) {
        return className + '__' + hash(className + version);
    }

    return className + '__' + hash(componentName + className + version);
}

module.exports = {
    getClassName,
    regExpFileName,
};
