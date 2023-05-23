import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {IInputProps} from '../../Input/Input';

/**
 * Свойства компонента NumberBaseInput.
 * @extends Omit<IInputProps, 'onChange' | 'placeholder'>, TestProps.
 */
export interface INumberBaseInputProps extends Omit<IInputProps, 'onChange' | 'max' | 'min'>, TestProps {
    /**
     * Значение.
     */
    value: string;

    /**
     * Обработчик изменения значения. Вызывается непосредственно перед onBlur (так исторически сложилось).
     */
    onChange: (value: string) => void;
    /**
     * Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
     */
    valueFractionLength?: number;
    /**
     * Количество знаков в дробной части. При значении 0 подразумевается целочисленное значение.
     */
    placeholderFractionLength?: number;
}
