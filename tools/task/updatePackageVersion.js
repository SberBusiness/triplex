/* eslint-env node */
const fs = require('fs');
const {getUpdatedVersion, createErrorWithMessage} = require('../utils/updatePackageVersion');

/** Разбор аргументов на нужные параметры. */
function parseArgv(allArgv) {
    const paramsString = allArgv[2];

    if (!paramsString || !paramsString.length) {
        throw createErrorWithMessage('Не распознано ни одного параметра.');
    }

    return paramsString.replace(/-/g, '').split(' ');
}

function updatePackageLockVersionInFile(version) {
    const fileName = 'package-lock.json';
    const json = JSON.parse(fs.readFileSync(fileName, {encoding: 'utf8'}));

    json.version = version;

    if (json.lockfileVersion && json.lockfileVersion > 1) {
        json.packages[""].version = version;
    }

    fs.writeFileSync(fileName, JSON.stringify(json, null, 4) + '\n');
}

/** Функция обновления версии пакета в файле. */
function updatePackageVersionInFile() {
    const argv = parseArgv(process.argv);
    const fileName = 'package.json';
    const json = JSON.parse(fs.readFileSync(fileName, {encoding: 'utf8'}));

    json.version = getUpdatedVersion(json.version, ...argv);

    fs.writeFileSync(fileName, JSON.stringify(json, null, 4) + '\n');

    updatePackageLockVersionInFile(json.version);
}

updatePackageVersionInFile();
