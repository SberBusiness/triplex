const fs = require('fs');
const path = require('path');
const {name} = require('../../package');

const files = ['colors.less', 'marketing-colors.less', 'z-indexes.less'];

/**
 * Копирование файлов с переменными в итоговую сборку.
 */
function exportVariables(file) {
    const src = path.resolve(__dirname, '../../src/' + name + '/common/styles/theme/default/' + file);
    const dst = path.resolve(__dirname, '../../out/' + name + '/styles/shared/');

    if (fs.existsSync(src)) {
        if (!fs.existsSync(dst)) {
            fs.mkdirSync(dst, {recursive: true});
        }
        fs.copyFileSync(src, path.resolve(dst, file));
        console.log('Export of variables:', file, 'completed successfully.');
    } else {
        console.log('Incorrect path in variables export.');
        console.log('src is', src);
        console.log('dst is', dst);
    }
}

files.forEach((file) => {
    exportVariables(file);
});
