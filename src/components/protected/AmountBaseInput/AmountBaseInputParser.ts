import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';
import {StringUtils} from '@sberbusiness/triplex/utils/stringUtils';

/** Обработчик значения в AmountBaseInput. */
export class AmountBaseInputParser {
    /** Значение. */
    private value: string;
    /** Величина сдвига каретки. */
    private caretOffset: number;
    /** Максимальное количество знаков. */
    private readonly maxLength: number;
    /** Количество чисел после запятой. */
    private readonly fractionLength: number;

    constructor(maxLength: number, fractionLength: number) {
        this.value = '';
        this.caretOffset = 0;
        this.maxLength = maxLength;
        this.fractionLength = fractionLength;
    }

    /** Получение значения. */
    public getValue(): string {
        return this.value;
    }

    /** Получение величины сдвига каретки. */
    public getCaretOffset(): number {
        return this.caretOffset;
    }

    /** Применение входных данных для обработки. */
    public apply(value: string, caret: number): void {
        const length = value.length;

        if (this.maxLength > 0) {
            if (this.fractionLength == 0) {
                return this.parseInteger(value, caret, length);
            } else if (this.fractionLength > 0 && this.maxLength > this.fractionLength + 1) {
                return this.parseDecimal(value, caret, length);
            }
        }

        // Fallback
        this.value = '';
        this.caretOffset -= length;
    }

    /** Обработка значения в виде целого числа. */
    private parseInteger(value: string, caret: number, length: number): void {
        this.parseIntegerPart(value, caret, length, this.maxLength);
    }

    /** Обработка значения в виде десятичной дроби. */
    private parseDecimal(value: string, caret: number, length: number): void {
        const separatorIndex = this.findSeparatorIndex(value, caret, length);
        const [integerEnd, fractionalStart] = separatorIndex != -1 ? [separatorIndex, separatorIndex + 1] : [caret, caret];
        const [integerPart, fractionalPart] = [value.substring(0, integerEnd), value.substring(fractionalStart)];

        this.parseIntegerPart(integerPart, Math.min(caret, integerEnd), integerEnd, this.maxLength - this.fractionLength - 1);
        this.parseFractionalPart(fractionalPart, Math.max(caret - fractionalStart, 0), length - fractionalStart, this.fractionLength);
    }

    /** Обработка целой части числа. */
    private parseIntegerPart(value: string, caret: number, length: number, maxLength: number): void {
        const buffer: string[] = [];
        [value, caret, length] = this.trimLeadingZeros(value, caret, length);

        if (caret > 0) {
            const maxLengthBeforeCaret = maxLength - Math.floor(maxLength / 4) - (length - caret - Math.floor((length - caret) / 4));

            if (maxLengthBeforeCaret > 0) {
                for (let i = 0, n = 0; i < caret; i++) {
                    if (StringUtils.isDigit(value[i])) {
                        buffer.push(value[i]);
                        if (++n == maxLengthBeforeCaret) {
                            break;
                        }
                    }
                }
            }
        }

        if (caret < length) {
            for (let i = caret; i < length; i++) {
                if (StringUtils.isDigit(value[i])) {
                    buffer.push(value[i]);
                }
            }
        }

        this.value += buffer.join('');
        this.caretOffset -= length - buffer.length;
    }

    /** Обработка дробной части числа. */
    private parseFractionalPart(value: string, caret: number, length: number, maxLength: number): void {
        const buffer: string[] = [];

        if (caret > 0) {
            for (let i = 0, n = 0; i < caret; i++) {
                if (StringUtils.isDigit(value[i])) {
                    buffer.push(value[i]);
                    if (++n == maxLength) {
                        break;
                    }
                } else {
                    this.caretOffset--;
                }
            }
        }

        while (buffer.length < maxLength) {
            const index: number = length - (maxLength - buffer.length);

            if (index >= caret) {
                buffer.push(value[index]);
            } else {
                buffer.push('0');
            }
        }

        // Если целая часть отсутствует.
        if (this.value.length == 0) {
            // При ненулевой дробной части, восстанавливаем целый ноль.
            if (buffer.some((digit) => digit != '0')) {
                this.value += '0';
                this.caretOffset++;
            }
            // Останавливаем парсинг.
            else {
                return;
            }
        }

        this.value += AmountConst.DecimalPoint;
        this.value += buffer.join('');
    }

    /** Удаление ведущих нулей и всего, что им предшествует. */
    private trimLeadingZeros(value: string, caret: number, length: number): [string, number, number] {
        let start = 0;

        for (let i = 0; i < length; i++) {
            if (StringUtils.isDigit(value[i])) {
                start = i;
                if (value[i] != '0') {
                    break;
                }
            }
        }

        this.caretOffset -= start;

        return [value.substring(start), Math.max(caret - start, 0), length - start];
    }

    /** Нахождение индекса десятичного разделителя. */
    private findSeparatorIndex(string: string, caret: number, length: number): number {
        // Если каретка находится перед числом целой части.
        if (caret < length - (this.fractionLength + 1)) {
            for (let i = length - 1; i >= 0; i--) {
                if (StringUtils.isDecimalSeparator(string[i])) {
                    return i;
                }
            }
        }
        // Если каретка находится после целой части.
        else {
            for (let i = 0; i < length; i++) {
                if (StringUtils.isDecimalSeparator(string[i])) {
                    return i;
                }
            }
        }

        return -1;
    }
}
