import React from 'react';
import {DropdownMobileInput, IDropdownMobileInputProps} from '@sberbusiness/triplex/components/Dropdown/mobile';
import {defaultMonthYearPlaceholder} from '@sberbusiness/triplex/components/MonthYearPicker/const';

/** Свойства компонента MonthYearPickerDropdownHeaderTarget. */
export interface IMonthYearPickerDropdownHeaderTargetProps extends IDropdownMobileInputProps {}

/** Управляющий элемент компонента MonthYearPicker в заголовке DropdownMobile. */
export const MonthYearPickerDropdownHeaderTarget = React.forwardRef<HTMLInputElement, IMonthYearPickerDropdownHeaderTargetProps>(
    ({placeholder = defaultMonthYearPlaceholder, ...rest}, ref) => (
        <DropdownMobileInput placeholder={placeholder} readOnly {...rest} ref={ref} />
    )
);

MonthYearPickerDropdownHeaderTarget.displayName = 'MonthYearPickerDropdownHeaderTarget';
