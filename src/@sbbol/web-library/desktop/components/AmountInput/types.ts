import {INumberBaseInputProps} from '../protected/NumberBaseInput/types';

/**
 * Свойства компонента AmountInput.
 *
 * @extends INumberBaseInputProps
 */
export interface IAmountInputProps extends Omit<INumberBaseInputProps, 'valueFractionLength' | 'placeholderFractionLength'> {
    /**
     * @prop {string} currency Валюта для инпута (USD, RUB).
     */
    currency: string;
    /**
     * @prop {number} [fractionLength] количество знаков после разделителя.
     */
    fractionLength?: number;
}
