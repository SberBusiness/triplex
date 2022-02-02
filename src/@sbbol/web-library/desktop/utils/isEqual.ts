export const isEqual = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) {
            return false;
        }

        let length: number;
        let i: number;
        let keys: string[];
        if (Array.isArray(a) && Array.isArray(b)) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0; ) {
                if (!isEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) {
                return false;
            }
            for (const e of a.entries()) {
                if (!b.has(e[0])) {
                    return false;
                }
            }
            for (const e of a.entries()) {
                if (!isEqual(e[1], b.get(e[0]))) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) {
                return false;
            }
            for (const e of a.entries()) {
                if (!b.has(e[0])) {
                    return false;
                }
            }
            return true;
        }

        if (a.constructor === RegExp) {
            return a.source === b.source && a.flags === b.flags;
        }

        if (a.valueOf !== Object.prototype.valueOf) {
            return a.valueOf() === b.valueOf();
        }

        if (a.toString !== Object.prototype.toString) {
            return a.toString() === b.toString();
        }

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }

        for (i = length; i-- !== 0; ) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }

        for (i = length; i-- !== 0; ) {
            const key = keys[i];
            if (key === '_owner' && a.$$typeof) {
                // Не сравниваем родителей в React.
                continue;
            }
            if (!isEqual(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    return a !== a && b !== b; // Вернёт true если оба NaN.
};
