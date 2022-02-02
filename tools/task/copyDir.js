var fs = require('fs'),
    path = require('path');

function copyFile(source, target) {

    var targetFile = target;

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

/**
 * Копирует исходную папку внутрь целевой с сохранением имени.
 */
function copyDir(source, target) {
    var files = [];

    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyDir(curSource, targetFolder);
            } else {
                copyFile(curSource, targetFolder);
            }
        });
    }
}

function copy(src, dst) {
    if (
        fs.existsSync(src) &&
        fs.existsSync(dst) &&
        fs.lstatSync(src).isDirectory() &&
        fs.lstatSync(dst).isDirectory()
    ) {
        var files = fs.readdirSync(src);
        files.forEach(function (file) {
            var curSource = path.join(src, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyDir(curSource, dst);
            } else {
                copyFile(curSource, dst);
            }
        });
    } else {
        console.log('incorrect paths in copyDir');
        console.log('src is ', src);
        console.log('dst is ', dst);
    }
}

var src = path.resolve(__dirname, '../../out');
copy(src, 'D:/projects/deposits-app-v0/node_modules');
copy(src, 'C:/work/projects/sbbol/dcb-ui/node_modules');
