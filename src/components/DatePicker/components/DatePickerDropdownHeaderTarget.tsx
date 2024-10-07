import React from 'react';
import {DropdownMobileMaskedInput, IDropdownMobileMaskedInputProps} from '@sberbusiness/triplex/components/Dropdown/mobile';

/** Свойства компонента DatePickerDropdownHeaderTarget. */
export interface IDatePickerDropdownHeaderTargetProps extends Omit<IDropdownMobileMaskedInputProps, 'mask'> {}

/** Целевой элемент компонента DatePicker в заголовке DropdownMobile. */
export const DatePickerDropdownHeaderTarget = React.forwardRef<HTMLInputElement, IDatePickerDropdownHeaderTargetProps>(
    ({placeholderMask = DropdownMobileMaskedInput.presets.placeholderMasks.date, ...rest}, ref) => (
        <DropdownMobileMaskedInput
            mask={DropdownMobileMaskedInput.presets.masks.date}
            placeholderMask={placeholderMask}
            {...rest}
            forwardedRef={ref}
        />
    )
);

DatePickerDropdownHeaderTarget.displayName = 'DatePickerDropdownHeaderTarget';
