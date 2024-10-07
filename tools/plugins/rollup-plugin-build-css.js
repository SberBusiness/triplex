/* eslint-env node */
const stylesheetRegExp = /[\d\D]*stylesheet="(.*)";[\d\D]*/;
const stylesRegEx = /.*\.css$/;

function parseCJStoCssContent(cjsContent) {
    return cjsContent
        .toString()
        .replace(stylesheetRegExp, '$1')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
}

module.exports = function(sharedObject) {
    return {
        name: 'rollup-plugin-build-css',
        generateBundle(options, bundle) {
            const files = Object.keys(bundle);
            for (let i = 0, n = files.length; i < n; i++) {
                let fileName = files[i];

                if (!stylesRegEx.test(fileName)) {
                    return;
                }

                const fileContext = bundle[fileName];

                /** Достаём css-контент. */
                const content = parseCJStoCssContent(fileContext.code);

                /** Дополняем результативный css-контент для дальнейшей выгрузки в бандл (файл). */
                sharedObject.content += content;
            }
        },
    };
};
