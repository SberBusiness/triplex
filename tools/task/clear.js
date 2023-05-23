var fs = require('fs');
var path = require('path');

function clear(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filePath = path.resolve(dirPath, files[i]);
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                } else {
                    clear(filePath);
                }
            }
        }

        fs.rmdirSync(dirPath);
    }
}

clear('out');
clear('styleguidistDist');
