import {designTokensRefs} from '@sberbusiness/triplex/generated/refTokenTypes';

// Интерфейс для возможного расширения свойств токена.
export interface IDesignTokenValueBase {}

// Строковое значение токена.
export interface IDesignTokenValueString extends IDesignTokenValueBase {
    // Это свойство обязательно, оно исключает попадание под тип IDesignTokenValueRef.
    ref?: undefined;
    // Строковое значение токена, например '#fff', или '16px'.
    value: string;
}

// Значение токена ссылается на другой токен.
export interface IDesignTokenValueRef extends IDesignTokenValueBase {
    // Это свойство обязательно, оно исключает попадание под тип IDesignTokenValueString.
    value?: undefined;
    // Ссылка на другой токен.
    ref: (typeof designTokensRefs)[number];
}

// Значение токена.
export type TDesignTokenValue = IDesignTokenValueString | IDesignTokenValueRef;

// Значение токена в светлой и темной теме.
export type TDesignTokenValues = [TDesignTokenValue, TDesignTokenValue];
