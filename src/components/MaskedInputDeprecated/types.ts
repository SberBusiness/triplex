import {IStringHashMap} from '../../types/CoreTypes';
import {IFormatCharacterConfig, IInputMaskCoreSelection} from './MaskedInputDeprecatedBehavior';

/**
 * Конфигурация для работы с маской
 * Здесь ключи - это символы маски, а значения - конфигурации для обработки символов.
 */
export type TFormatCharacters = IStringHashMap<IFormatCharacterConfig>;

/**
 * Основная конфигурация экземпляра класс для работы с маской.
 *
 * @prop {TFormatCharacters} [formatCharacters]  Конфигурация для работы с маской.
 * @prop {string} pattern  Маска.
 * @prop {string} [placeholderChar]  Символ - заполнитель.
 * @prop {IInputMaskCoreSelection} [selection]  Положение каретки.
 * @prop {string} [value]  Начальное значение.
 * @prop {boolean} [overtype]  Признак замены символов при вводе.
 * @prop {boolean} [keepCharPositions]  Признак сохранения позиций символов при вводе/удалении.
 * @prop {Function} [validate]  Функция-валидатор значения (при невалидном вводе значение поля и
 * положение каретки не изменится).
 * @prop {string} [placeholderAsMask] Символы для заполнения пустых редактируемых позиций в маске (например строка
 * вида "дд.мм.гггг").
 */
export interface IInputMaskDeprecatedCoreConfig {
    formatCharacters?: TFormatCharacters;
    pattern: string;
    placeholderChar?: string;
    selection?: IInputMaskCoreSelection;
    value?: string;
    overtype?: boolean;
    keepCharPositions?: boolean;
    validate?: (value: string) => boolean;
    placeholderAsMask?: string;
}
