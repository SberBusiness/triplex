import React from 'react';
import {IInputProps, Input} from '@sberbusiness/triplex/components/Input/Input';
import {ISuggestOption} from '@sberbusiness/triplex/components/Suggest/types';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

export interface ISuggestMobileTarget extends Omit<IInputProps, 'onSelect' | 'value'> {
    // Выбранное значение.
    value?: ISuggestOption;
}

/**
 * Поле ввода, отображающее выбранное значение. Отображается на форме, при клике на него открывается мобильный Dropdown.
 */
export const SuggestMobileTarget = React.forwardRef<HTMLInputElement, ISuggestMobileTarget>(({className, value, ...rest}, ref) => (
    <Input
        className={classnames('cssClass[suggestMobileTarget]', className)}
        value={value ? value.label : ''}
        readOnly
        {...rest}
        ref={ref}
    />
));

SuggestMobileTarget.displayName = 'SuggestMobileTarget';
