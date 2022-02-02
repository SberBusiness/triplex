import * as React from 'react';
import {IAmountInputProps} from '@sbbol/web-library/desktop/components/AmountInput/types';
import {NumberInput} from '@sbbol/web-library/desktop/components/NumberInput/NumberInput';

/** Компонент ввода суммы. */
export class AmountInput extends React.PureComponent<IAmountInputProps> {
    public static displayName = 'AmountInput';

    public static defaultProps = {
        fractionLength: 2,
    };

    public render(): JSX.Element {
        const {currency, fractionLength, ...restProps} = this.props;

        return (
            <NumberInput valueFractionLength={fractionLength} placeholderFractionLength={fractionLength} unit={currency} {...restProps} />
        );
    }
}
