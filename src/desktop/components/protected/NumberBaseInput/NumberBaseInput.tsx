import React from 'react';
import {Input} from '@sberbusiness/triplex/desktop/components/Input/Input';
import {AmountConst} from '@sberbusiness/triplex/desktop/common/consts/AmountConst';
import {formatAmount} from '@sberbusiness/triplex/desktop/utils/amountUtils';
import {setCaretPosition} from '@sberbusiness/triplex/desktop/utils/inputUtils';
import {INumberBaseInputProps} from './types';
import {NumberBaseChangeManager} from './NumberBaseChangeManager';

/** Максимальная длина поля ввода суммы. 16 символов до запятой, самая запятая, 2 символа после запятой. */
const NUMBER_INPUT_MAX_LENGTH = 19;

/** Состояния NumberBaseInput. */
export interface INumberBaseInputState {
    /** Отформатированное значение. */
    formattedValue: string;
}

/** Компонент ввода суммы. */
export class NumberBaseInput extends React.Component<INumberBaseInputProps, INumberBaseInputState> {
    public static displayName = 'NumberBaseInput';

    public static defaultProps = {
        valueFractionLength: 2,
        maxLength: NUMBER_INPUT_MAX_LENGTH,
    };

    public state = {
        formattedValue: formatAmount(this.props.value, this.props.valueFractionLength),
    };

    private caret = 0;

    /**
     * Ссылка на поле ввода суммы.
     */
    private input: HTMLInputElement | undefined;

    public componentDidUpdate(prevProps: Readonly<INumberBaseInputProps>): void {
        const {value, valueFractionLength} = this.props;

        if (value !== prevProps.value || valueFractionLength !== prevProps.valueFractionLength) {
            this.setState({formattedValue: formatAmount(value, valueFractionLength)}, () => {
                this.input!.value = this.state.formattedValue;
                setCaretPosition(this.input, this.caret);
            });
        }
    }

    public render(): JSX.Element {
        const {error, placeholderFractionLength, value, valueFractionLength, title, placeholder, maxLength, ...restProps} = this.props;
        const {formattedValue} = this.state;

        return (
            <Input
                {...restProps}
                value={formattedValue}
                title={title || formattedValue}
                placeholder={placeholder || formatAmount('0', placeholderFractionLength)}
                onChange={this.handleChange}
                autoComplete="off"
                error={error}
                ref={this.setInputRef}
            />
        );
    }

    /**
     * Обработчик onChange input-а.
     * @param {React.ChangeEvent<HTMLInputElement>} event Событие.
     */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {valueFractionLength, maxLength} = this.props;
        const {formattedValue: prevFormattedValue} = this.state;
        const field = event.target;

        const {formattedValue, caret, prevCaret} = NumberBaseChangeManager.handleChange(
            event,
            prevFormattedValue,
            valueFractionLength!,
            maxLength!
        );

        const formattedValueCalc = formatAmount(formattedValue, valueFractionLength, false, true).replace(
            AmountConst.DecimalSeparator,
            AmountConst.DecimalSeparatorCalc
        );

        field.value = prevFormattedValue;
        setCaretPosition(field, prevCaret);

        this.caret = caret;
        this.props.onChange(formattedValueCalc);
    };

    /**
     * Установка ссылки на поле ввода.
     * @param {HTMLInputElement} ref Ссылка на элемент.
     */
    private setInputRef = (ref: HTMLInputElement) => {
        this.input = ref;
    };
}
