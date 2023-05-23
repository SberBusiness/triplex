const {
    regExpStyle,
    regExpRuntimeCssClass,
    cssClassReplacer,
    runtimeCssClassReplacer,
    setCurrentFile,
} = require('../../tools/utils/replacers');

module.exports = function(content, map, meta) {
    setCurrentFile(this.resourcePath);

    return content
        .replace(regExpStyle, cssClassReplacer)
        .replace(regExpRuntimeCssClass, runtimeCssClassReplacer)
};
