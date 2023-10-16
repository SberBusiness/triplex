const regExp = /(src)(?:\/.+\/)(\w+)\/styles\/\w+(?:\.less)?/;

/**
 * Разбираем путь файла на нужные для сборки части.
 *
 * @param fileName Наименование файлов (включая его относительное расположение).
 * @param componentName Имя компонента, для переопределения.
 */
module.exports = function(fileName, componentName) {
    const styleData = fileName.match(regExp);

    if (!styleData) {
        throw Error(`Unknown path to file of styles: '${fileName}'.`);
    }

    const platform = styleData[1];
    const newComponentName = componentName || styleData[2];

    return {
        outPath: `styles/components/${newComponentName}`,
        platform,
        componentName: newComponentName,
    };
};
