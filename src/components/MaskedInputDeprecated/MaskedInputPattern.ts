import {
    DEFAULT_FORMAT_CHARACTERS,
    DEFAULT_PLACEHOLDER_CHAR,
    ESCAPE_CHAR,
} from '@sberbusiness/triplex/components/MaskedInputDeprecated/consts';
import {TFormatCharacters} from '@sberbusiness/triplex/components/MaskedInputDeprecated/types';
import {IStringHashMap} from '../../types/CoreTypes';

/** Класс шаблона маски. */
export class Pattern {
    /** Шаблон после обработки символов экранирования. */
    public pattern: string[];
    /** Длина шаблона после обработки символов экранирования. */
    public length: number;
    /** Индекс первого редактируемого элемента. */
    public firstEditableIndex: number;
    /** Индекс последнего редактируемого элемента. */
    public lastEditableIndex: number;
    /** Символ-заполнитель. */
    private readonly placeholderChar: string;
    /** Символы для заполнения пустых редактируемых позиций в маске. */
    private readonly placeholderAsMask?: string[];
    /** Правила обработки символов маски. */
    private readonly formatCharacters: TFormatCharacters;
    /** Шаблон с символами экранирования. */
    private readonly source: string;
    /** Хэш редактируемых индексов в шаблоне. */
    private readonly editableIndices: IStringHashMap<boolean> = {};

    /**
     * @param {string} source Маска.
     * @param {TFormatCharacters} formatCharacters Правила обработки символов маски.
     * @param {string} placeholderChar Символ-заполнитель.
     * @param {string?} placeholderAsMask Строка-заполнитель (имеет более высокий приоритет, чем символ).
     */
    constructor(
        source: string,
        formatCharacters: TFormatCharacters = DEFAULT_FORMAT_CHARACTERS,
        placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR,
        placeholderAsMask?: string
    ) {
        this.placeholderAsMask = placeholderAsMask?.split('');
        this.placeholderChar = placeholderChar;
        this.formatCharacters = formatCharacters;
        this.source = source;
        this.pattern = [];
        this.length = 0;
        this.firstEditableIndex = -1;
        this.lastEditableIndex = -1;
        this.editableIndices = {};
        this.parse();
    }

    /**
     * Возвращает символ-заполнитель для ещё не введённых редактируемых индексов.
     */
    public getPlaceholderChar(idx: number): string {
        return (this.placeholderAsMask && this.placeholderAsMask[idx]) || this.placeholderChar;
    }

    /**
     * Форматирование значения по шаблону.
     *
     * @param {string[]} value Исходное значение.
     * @return {string[]} Отформатированное значения.
     */
    public formatValue(value: string[]): string[] {
        const buffer: string[] = [];

        for (let i = 0, j = 0, l = this.length; i < l; i++) {
            if (this.isEditableIndex(i)) {
                const l = value.length;

                while (j < l && !this.isValidAtIndex(value[j], i)) {
                    j++;
                }
                if (j === l) {
                    return buffer;
                }
                buffer[i] = this.transform(value[j++], i);
            } else {
                buffer[i] = this.pattern[i];
                if (value.length > j && value[j] === this.pattern[i]) {
                    j++;
                }
            }
        }
        return buffer;
    }

    public formatPlaceholderValue(value: string[]): string[] {
        const buffer = [];

        for (let i = 0, l = this.length; i < l; i++) {
            if (this.isEditableIndex(i)) {
                buffer[i] = value[i] ?? this.getPlaceholderChar(i);
            } else {
                buffer[i] = this.pattern[i];
            }
        }
        return buffer;
    }

    /**
     * Является ли данный индекс редактируемым.
     *
     * @param {number} index Индекс для проверки.
     * @return {boolean} Результат проверки.
     */
    public isEditableIndex(index: number): boolean {
        return this.editableIndices[index];
    }

    /**
     * Подходит ли маске данный символ в данной позиции.
     *
     * @param {string} char Символ для проверки.
     * @param {number} index Позиция символа.
     * @return {boolean} Результат проверки.
     */
    public isValidAtIndex(char: string, index: number): boolean {
        const format = this.formatCharacters[this.pattern[index]];

        return format.validate(char);
    }

    /**
     * Трансформация символа по маске.
     *
     * @param {string} char Символ для трансформации.
     * @param {number} index Позиция символа.
     * @return {boolean} Трансформированный символ.
     */
    public transform(char: string, index: number): string {
        const format = this.formatCharacters[this.pattern[index]];

        return typeof format.transform === 'function' ? format.transform(char) : char;
    }

    /**
     * Возвращает исходное значение по отформатированному и маске.
     */
    public getRawValue(value: string[]): string {
        const buffer = [];

        for (let i = 0, l = value.length; i < l; i++) {
            if (this.editableIndices[i] === true) {
                buffer.push(value[i]);
            }
        }
        return buffer.join('');
    }

    /** Разбор на редактируемые и не редактируемые символы по маске. */
    private parse() {
        const pattern = [];
        const source = this.source.split('');

        for (let i = 0, j = 0, l = source.length; i < l; i++) {
            let char = source[i];

            if (char === ESCAPE_CHAR) {
                if (i === l - 1) {
                    throw new Error('InputMaskCore: pattern ends with a raw ' + ESCAPE_CHAR);
                }
                char = source[++i];
            } else if (char in this.formatCharacters) {
                if (this.firstEditableIndex === -1) {
                    this.firstEditableIndex = j;
                }
                this.lastEditableIndex = j;
                this.editableIndices[j] = true;
            }

            pattern.push(char);
            j++;
        }

        if (this.firstEditableIndex === -1) {
            throw new Error('InputMaskCore: pattern "' + this.source + '" does not contain any editable characters.');
        }

        this.pattern = pattern;
        this.length = pattern.length;
    }
}
