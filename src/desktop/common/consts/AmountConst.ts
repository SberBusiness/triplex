/**
 * Стандартные размерности для дробных частей.
 */
export type TFractionLength = 0 | 2 | 4 | 5;

/**
 * Интерфейс форматов поля Amount (сумма).
 * @prop {string} DecimalSeparator Разделитель целой и дробной частей числа.
 * @prop {string} DecimalSeparatorCalc Разделитель целой и дробной частей числа, используемый для вычислений (BigInt) и на бэкенде.
 * @prop {TFractionLength} FractionLength Количество знаков после разделителя в сумме.
 * @prop {string} GroupsSeparator Разделитель групп разрядов.
 */
interface IAmountConst {
    DecimalSeparator: string;
    DecimalSeparatorCalc: string;
    FractionLength: TFractionLength;
    GroupSeparator: string;
}

/** Константы форматов поля Amount (сумма). */
export const AmountConst: IAmountConst = {
    DecimalSeparator: ',',
    DecimalSeparatorCalc: '.',
    FractionLength: 2,
    GroupSeparator: String.fromCharCode(160),
};
