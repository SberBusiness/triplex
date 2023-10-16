// Маппинг js префиксов в css
const jsCssMap: {[key: string]: string} = {
    Moz: '-moz-',
    O: '-o-',
    Webkit: '-webkit-',
    ms: '-ms-',
};

/**
 *
 * @param element
 * @param cssProperty (с заглавной буквы)
 * @param cssValue
 * @param addCssPrefix
 */

export function addCrossPlatformStyle(element: any, cssProperty: string, cssValue: string, addCssPrefix = false) {
    for (const key of Object.keys(jsCssMap)) {
        element.style[`${key}${cssProperty}`] = addCssPrefix ? `${jsCssMap[key]}${cssValue}` : cssValue;
    }
}
