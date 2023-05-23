const hash = require('../utils/hash');
const {version} = require('../../package');
const {getClassName, regExpFileName} = require('../utils/getClassName');
const regExpStyle = /(["'])cssClass\[(\w+)\](["'])/g;
const regExpRuntimeCssClass = /(cssClass\([^)]+)\)/g;

let currentFile = ''; // Текущий файл.

function setCurrentFile(file) {
    currentFile = file;
}

function cssClassReplacer(match, p1, p2, p3, offset, string) {
    return p1 + getClassName(currentFile, p2) + p3;
}

function runtimeCssClassReplacer(match, p1, offset, string) {
    return p1 + ", '" + regExpFileName.exec(currentFile)[2] + "', '" + version + "')";
}

module.exports = {
    regExpFileName,
    regExpStyle,
    regExpRuntimeCssClass,
    cssClassReplacer,
    runtimeCssClassReplacer,
    setCurrentFile,
};
