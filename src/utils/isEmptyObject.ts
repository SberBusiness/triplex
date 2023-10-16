/** Проверяет пустой ли объект. */
export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0 && obj.constructor === Object;
