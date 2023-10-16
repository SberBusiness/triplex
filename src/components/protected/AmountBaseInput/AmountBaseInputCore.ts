import {AmountConst} from '@sberbusiness/triplex/consts/AmountConst';
import {AmountBaseInputParser} from './AmountBaseInputParser';
import {AmountBaseInputFormatter} from './AmountBaseInputFormatter';

/** Основная логика в AmountBaseInput. */
export class AmountBaseInputCore {
    /** Значение. */
    public value: string;
    /** Отформатированное значение */
    public formattedValue: string;
    /** Положение каретки. */
    public caret: number;
    /** Текст подсказки. */
    public placeholder: string;
    /** Максимальное количество знаков. */
    private readonly maxLength: number;
    /** Количество чисел после запятой. */
    private readonly fractionLength: number;

    constructor(maxLength: number, fractionDigits: number) {
        this.value = '';
        this.formattedValue = '';
        this.caret = 0;
        this.maxLength = maxLength;
        this.fractionLength = fractionDigits;
        this.placeholder = this.getPlaceholder();
    }

    /** Применение входных данных для основной логики. */
    public apply(value: string, caret: number): void {
        this.parse(value, caret);
        this.format(this.value);
    }

    /** Обработка значения. */
    private parse(value: string, caret: number): void {
        const parser = new AmountBaseInputParser(this.maxLength, this.fractionLength);

        parser.apply(value, caret);

        this.value = parser.getValue();
        this.caret = caret + parser.getCaretOffset();
    }

    /** Форматирование значения. */
    private format(value: string): void {
        const formatter = new AmountBaseInputFormatter(this.maxLength, this.fractionLength);

        formatter.apply(value);

        this.formattedValue = formatter.getValue();
        this.caret += formatter.getCaretOffset();
    }

    /** Получение текста подсказки. */
    private getPlaceholder(): string {
        const buffer: string[] = [];

        buffer.push('0');
        if (this.fractionLength > 0) {
            buffer.push(AmountConst.DecimalComma);
            for (let i = 0; i < this.fractionLength; i++) {
                buffer.push('0');
            }
        }

        return buffer.join('');
    }
}
