import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {MaskedInput, IMaskedInputProps} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

/** Свойства компонента DatePickerInputTarget. */
export interface IDatePickerInputTarget extends Omit<IMaskedInputProps, 'mask'> {}

/** Маскированное поле ввода компонента DatePicker. */
export const DatePickerInputTarget: React.VFC<IDatePickerInputTarget> = ({
    className,
    placeholderMask = MaskedInput.presets.placeholderMasks.date,
    ...rest
}) => {
    const classNames = classnames('cssClass[datePickerInputTarget]', className);
    const mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

    return <MaskedInput className={classNames} mask={mask} placeholderMask={placeholderMask} {...rest} />;
};
