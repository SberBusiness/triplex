var fs = require('fs');
var forEachFolder = require('../utils/forEachFolder');
var pkg = require('../../package');
var dts = require('dts-bundle');

var outFolder = 'out/';
var regExpIsDts = /(.*)\.d\.ts$/;
var rxLeftPart = new RegExp('^' + outFolder.replace(/[\/\\]/g, '[\\/\\\\]') + '\\/?');
var excludes = [];

/**
 * Создаём в папке назначения временный индексный файл, куда импортим всю типизацию.
 */

var dtsLinks = '';
forEachFolder({
    path: outFolder,
    iterator: function(filePath) {
        if (regExpIsDts.test(filePath)) {
            var i = excludes.length;
            var isExcluded = false;
            while (i-- > 0) {
                if (filePath.indexOf(excludes[i]) !== -1) {
                    isExcluded = true;
                    break;
                }
            }
            if (!isExcluded) {
                dtsLinks += "export * from './" + regExpIsDts.exec(filePath.replace(rxLeftPart, ''))[1] + "';\n";
            }
        }
    },
});

var outDtsFile = outFolder + '/types.d.ts';
fs.writeFileSync(outDtsFile, dtsLinks);

/**
 * Этот файл собираем в нормальный бандл с неймспейсами.
 */
dts.bundle({
    name: pkg.name,
    main: outDtsFile,
    out: 'index.d.ts',
    removeSource: false,
});

/**
 * Из получившегося бандла надо убрать индексные импорты, поскольку предполагается покомпонентное использование библиотеки.
 */
var regExpRemoveIndex = /[\w\W]+declare module '@sber-business\/triplex' {[^}]+}\n\n/;

var index = fs.readFileSync(outFolder + '/index.d.ts').toString('utf8');
index = index.replace(/\r\n/g, '\n').replace(regExpRemoveIndex, '');
index = index.substr(0, index.length - 1);
fs.writeFileSync(outFolder + '/index.d.ts', index);
fs.unlinkSync(outDtsFile);
