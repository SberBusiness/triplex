/**
 * Интерфейс для пропсов компонент с тестовым атрибутом.
 * @prop {string} [data-test-id] Тестовый атрибут.
 */
export interface TestProps {
    'data-test-id'?: string;
}

/**
 * Интерфейс для описания хэш-мапов, в которых ключ является строкой.
 */
export interface IStringHashMap<TValue> {
    [prop: string]: TValue;
}
