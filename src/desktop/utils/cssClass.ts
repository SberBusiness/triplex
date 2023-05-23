const CryptoJS = require('../../common/utils/sha256');

export const cssClass = (className: string, componentName?: string, version?: string): string => {
    if (process.env.JEST_WORKER_ID !== undefined) {
        // Чтобы при поднятии версии либы не пришлось перегенерировать снепшоты.
        return `cssClass[${className}]`;
    }
    // Собираем обрабатываемую строку.
    const str = `${componentName || ''}${className || ''}${version || ''}`;

    const hash = CryptoJS.SHA256(str).toString();

    return className + '__' + hash.slice(0, 8);
};
