const hash = require('../hash');
const flattenDeep = require('lodash.flattendeep');

describe('hash', () => {
    it('Возвращает разные хеши для разных версий', () => {
        const string = 'LightBox';
        // Массив версий от 4.0.0 до 9.9.20.
        let versions = [4,5,6,7,8,9]
            .map((major) => {
                return [0,1,2,3,4,5,6,7,8,9].map((minor) => {
                    return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((path) => [`${major}.${minor}.${path}`]);
                })
            });

        versions = flattenDeep(versions);

        // Массив хешей.
        const result = [];
        // Флаг возвращающий true в случае одинаковых хешей.
        let hasDouble = false;

        versions.forEach(version => {
            const h = hash(string + version);
            if (!result.includes(h)) {
                result.push(h);
            } else {
                hasDouble = true;
            }
        })

        expect(hasDouble).toBeFalsy();
    });
});
