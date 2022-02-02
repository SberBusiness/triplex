import {AmountConst} from '@sbbol/web-library/desktop/common/consts/AmountConst';
import {Input} from '@sbbol/web-library/desktop/components/Input/Input';
import {formatAmount} from '@sbbol/web-library/desktop/utils/amountUtils';
import * as React from 'react';
import {INumberBaseInputProps} from './types';
import {setCaretPosition} from '@sbbol/web-library/desktop/utils/inputUtils';
import {NumberBaseChangeManager} from './NumberBaseChangeManager';
import {isEqual} from '@sbbol/web-library/desktop/utils/isEqual';

/** Максимальная длина поля ввода суммы. 16 символов до запятой, самая запятая, 2 символа после запятой. */
const inputMaxLength = 19;

/**
 * Состояние компонента.
 * @param {string} formattedValue Отформатированное значение, пришедшее из props.
 */
export interface INumberBaseInputState {
    formattedValue: string;
}

/** Компонент ввода суммы. */
export class NumberBaseInput extends React.Component<INumberBaseInputProps, INumberBaseInputState> {
    public static displayName = 'NumberBaseInput';

    public static defaultProps = {
        maxLength: inputMaxLength,
    };

    public state = {
        formattedValue: formatAmount(this.props.value, this.props.valueFractionLength),
    };

    /**
     * Нажатая клавиша на клавиатуре. Запоминаем её, что бы учитывать в onChange.
     */
    private pressedButton = '';

    /**
     * Ссылка на поле ввода суммы.
     */
    private input: HTMLInputElement | undefined;

    shouldComponentUpdate(nextProps: INumberBaseInputProps, nextState: INumberBaseInputState): boolean {
        const {value: nextPropsValue, ...restNextProps} = nextProps;
        const {value, ...restThisProps} = this.props;
        const stateFormattedValue = this.state.formattedValue;

        const newPropsFormattedValue = formatAmount(nextPropsValue, nextProps.valueFractionLength);
        const valueChanged = newPropsFormattedValue !== stateFormattedValue || nextState.formattedValue !== stateFormattedValue;
        const otherPropsChanged = !isEqual({...restThisProps}, {...restNextProps});
        return valueChanged || otherPropsChanged;
    }

    public componentDidUpdate(prevProps: Readonly<INumberBaseInputProps>): void {
        const {value: newValue, valueFractionLength} = this.props;

        if (prevProps.value !== newValue || prevProps.valueFractionLength !== valueFractionLength) {
            this.setState({formattedValue: formatAmount(newValue, valueFractionLength)});
        }
    }

    public render(): JSX.Element {
        const {error, placeholderFractionLength, maxLength, value, valueFractionLength, title, placeholder, ...restProps} = this.props;
        const {formattedValue} = this.state;

        return (
            <Input
                {...restProps}
                title={title || formattedValue}
                placeholder={placeholder || formatAmount('0', placeholderFractionLength)}
                autoComplete="off"
                setInputRef={this.setInputRef}
                value={formattedValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                error={error}
            />
        );
    }

    /**
     * Обработчик onChange input-а.
     * @param {React.ChangeEvent<HTMLInputElement>} e Событие.
     */
    private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {valueFractionLength, maxLength, max} = this.props;
        const {formattedValue: prevValueFormatted} = this.state;
        const field = e.target;

        if (!field) {
            return;
        }

        const {formattedValue, caret} = NumberBaseChangeManager.handleChange(
            e,
            prevValueFormatted,
            valueFractionLength!,
            max,
            maxLength!,
            this.pressedButton
        );

        field.value = formattedValue; // устанавливаем значение сразу, что бы не прыгала каретка.

        if (document.activeElement === this.input) {
            setCaretPosition(field, caret);
        }

        this.setState({formattedValue}, () => {
            const newValueCalcFormatted = formatAmount(formattedValue, valueFractionLength, false, true).replace(
                AmountConst.DecimalSeparator,
                AmountConst.DecimalSeparatorCalc
            );
            this.props.onChange(newValueCalcFormatted);
        });
    };

    /**
     * Обработчик onKeyDown input-а.
     * @param {React.KeyboardEvent<HTMLInputElement>} e Событие.
     */
    private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        this.pressedButton = e.key;
    };

    /**
     * Установка ссылки на поле ввода.
     * @param {HTMLInputElement} ref Ссылка на элемент.
     */
    private setInputRef = (ref: HTMLInputElement) => {
        this.input = ref;
    };
}
