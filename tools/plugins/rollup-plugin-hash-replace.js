/* eslint-env node */
const {
    regExpStyle,
    regExpRuntimeCssClass,
    regExpMarkupGuardId,
    cssClassReplacer,
    runtimeCssClassReplacer,
    markupGuardReplacer,
    setCurrentFile,
} = require('../utils/replacers');

const regExpIsTs = /([\/\\]|^)\w+\.tsx?$/;

module.exports = function() {
    return {
        name: 'rollup-plugin-hash-replace',
        transform(code, id) {
            if (regExpIsTs.test(id)) {
                setCurrentFile(id);
                return code
                    .replace(regExpStyle, cssClassReplacer)
                    .replace(regExpRuntimeCssClass, runtimeCssClassReplacer)
                    .replace(regExpMarkupGuardId, markupGuardReplacer);
            }
        },
    };
};
