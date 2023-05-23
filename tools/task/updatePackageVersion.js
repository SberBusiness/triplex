const fs = require('fs');
const updatePackageVersion = require('../utils/updatePackageVersion');

/** Разбор аргументов на нужные параметры. */
function parseArgv(allArgv) {
    const paramsString = allArgv[2];
    if (!paramsString || !paramsString.length) {
        throw createErrorWithMessage('Не распознано ни одного параметра.');
    }

    return paramsString.replace(/-/g, '').split(' ');
}

/** Функция обновления версии пакета в файле. */
function updatePackageVersionInFile() {
    const fileName = 'package.json';
    const argv = parseArgv(process.argv);
    const segment = argv[0];
    const newTag = argv[1];

    let content = fs.readFileSync(fileName, {encoding: 'utf8'});
    content = updatePackageVersion.updatePackageVersionInContent(segment, newTag, content);
    fs.writeFileSync(fileName, content);
}

updatePackageVersionInFile();
