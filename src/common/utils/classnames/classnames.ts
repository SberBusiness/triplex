export type TClass = undefined | string | number | {[key: string]: boolean};

export function classnames(...attrs: Array<TClass | TClass[]>): string {
    const classes = [];

    for (let i = 0, n = attrs.length; i < n; i++) {
        const arg = attrs[i];
        if (!arg) {
            continue;
        }

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (arg instanceof Array) {
            if (arg.length) {
                const inner = classnames(...arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (arg instanceof Object && arg.constructor === Object) {
            for (const key in arg) {
                if (arg.hasOwnProperty(key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}
