import sjcl from 'sjcl';

export const cssClass = (className: string, componentName?: string, version?: string): string => {
    if (process.env.JEST_WORKER_ID !== undefined) {
        // Чтобы при поднятии версии либы не пришлось перегенерировать снепшоты.
        return `cssClass[${className}]`;
    }
    // Собираем обрабатываемую строку.
    const str = `${componentName || ''}${className || ''}${version || ''}`;

    const bitArray = sjcl.hash.sha256.hash(str);
    const hash = sjcl.codec.hex.fromBits(bitArray);

    return className + '__' + hash.slice(0, 8);
};
