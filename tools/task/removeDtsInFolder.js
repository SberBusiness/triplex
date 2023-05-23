const fs = require('fs');
const path = require('path');
const reDts = /^(\w+)\.d\.ts?$/;

/**
 * Пока не придумано универсального правила, так что просто удаляем d.ts-ки прописанные здесь (те случаи, когда файл только для внутрибиблиотечного использования).
 * @type {string[]}
 */
const listToDelete = [
    // 'Button/Button.d.ts'
];

/**
 * Эти файлы не удаляем, даже если к ним нет js-ки.
 * @type {string[]}
 */
const listToSave = [
  'types.d.ts'
];

/**
 * Проверка подлежит ли файл удалению по списку исключений.
 *
 * @param {string} path Путь до файла.
 * @return {boolean}
 */
function isNeedToDeleteByList(path) {
    for (let i = 0, n = listToDelete.length; i < n; i++) {
        path = path.replace(/[\\/]/g, '/');
        if(path.indexOf(listToDelete[i]) >= 0) {
            return true;
        }
    }
    return false;
}

/**
 * Проверка подлежит ли файл сохранению по списку исключений.
 *
 * @param {string} path Путь до файла.
 * @return {boolean}
 */
function isNeedToSave(path) {
    for (let i = 0, n = listToSave.length; i < n; i++) {
        path = path.replace(/[\\/]/g, '/');
        if(path.indexOf(listToSave[i]) >= 0) {
            return true;
        }
    }
    return false;
}

function removeDtsInFolder(folderPath) {
    if(fs.existsSync(folderPath)) {
        var files = fs.readdirSync(folderPath);
        for (let i = 0, n = files.length; i < n; i++) {
            let fileName = files[i];
            let filePath = path.resolve(folderPath, fileName);
            if(fs.statSync(filePath).isFile()) {
                let parsed = reDts.exec(fileName);
                if(parsed) {
                    let baseName = parsed[1];
                    if(files.indexOf(baseName + '.js') === -1 || isNeedToDeleteByList(filePath)) {
                        // d.ts сгенерился, но файла нет, значит его нельзя импортировать, а потому следует удалить типизацию.
                        // Либо файл в списке исключений (не предназначен для экспорта во вне).
                        if(!isNeedToSave(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    }
                }
            } else {
                removeDtsInFolder(filePath);
            }
        }
        files = fs.readdirSync(folderPath);
        if (files.length === 0) {
            fs.rmdirSync(folderPath);
        }
    }
}

removeDtsInFolder('out');
