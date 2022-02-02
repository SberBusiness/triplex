import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';
import {NumberBaseInput} from '../protected/NumberBaseInput/NumberBaseInput';
import {INumberBaseInputProps} from '../protected/NumberBaseInput/types';

/**
 * Свойства компонента.
 * @extends INumberBaseInputProps
 */
export interface INumberInputProps extends INumberBaseInputProps {
    /** Еденица измерения.*/
    unit?: string;
}

/** Компонент ввода суммы или количества. */
export class NumberInput extends React.PureComponent<INumberInputProps> {
    public static displayName = 'NumberInput';
    public static defaultProps = {
        max: Number.MAX_SAFE_INTEGER,
        min: Number.MIN_SAFE_INTEGER,
    };

    public render(): JSX.Element {
        const {className, unit, 'data-test-id': dataTestId = NumberInput.displayName, ...restProps} = this.props;
        const {disabled, error, value} = restProps;

        const amountInputClassNames = classnames(className, 'cssClass[numberInput]', {
            'cssClass[disabled]': Boolean(disabled),
            'cssClass[error]': Boolean(error),
            'cssClass[filled]': Boolean(value),
            'cssClass[withUnit]': Boolean(unit),
        });

        return (
            <div className={amountInputClassNames} data-test-id={dataTestId}>
                <NumberBaseInput {...restProps} data-test-id={`${dataTestId}__input`} />
                {unit && (
                    <div className="cssClass[unitBox]">
                        <span className="cssClass[unitText]" data-test-id={`${dataTestId}__unit`}>
                            {unit}
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
