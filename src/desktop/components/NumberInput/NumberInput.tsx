import * as React from 'react';
import {EInputGroupPosition} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {NumberBaseInput} from '../protected/NumberBaseInput/NumberBaseInput';
import {INumberBaseInputProps} from '../protected/NumberBaseInput/types';

/**
 * Свойства компонента NumberInput.
 */
export interface INumberInputProps extends INumberBaseInputProps {
    /** Единица измерения.*/
    unit?: string;
    /** Позиция внутри компонента InputGroup. */
    groupPosition?: EInputGroupPosition;
}

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/** Компонент ввода суммы или количества. */
export const NumberInput: React.FC<INumberInputProps> = ({className, unit, groupPosition, 'data-test-id': dataTestId, ...restProps}) => {
    const {value, error, disabled} = restProps;

    const classNames = classnames(
        'cssClass[numberInput]',
        {
            'cssClass[filled]': !!value,
            'cssClass[withUnit]': !!unit,
            'cssClass[grouped]': !!groupPosition,
            'cssClass[error]': !!error,
            'cssClass[disabled]': !!disabled,
        },
        className
    );

    return (
        <div className={classNames} data-test-id={dataTestId}>
            <NumberBaseInput
                {...restProps}
                className={groupPosition && mapInputGroupPositionToCSSClass[groupPosition]}
                data-test-id={dataTestId ? `${dataTestId}__input` : undefined}
            />
            {unit && (
                <div className="cssClass[unitBox]">
                    <span className="cssClass[unitText]" data-test-id={dataTestId ? `${dataTestId}__unit` : undefined}>
                        {unit}
                    </span>
                </div>
            )}
        </div>
    );
};
