import React from 'react';

export interface ISuggestMobileInput extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Поле ввода, фильтрующее выпадающий список. Отображается внутри мобильного Dropdown.
 */
export const SuggestMobileInput = React.forwardRef<HTMLInputElement, ISuggestMobileInput>((inputHTMLAttributes, ref) => (
    <input className="cssClass[suggestMobileInput]" {...inputHTMLAttributes} ref={ref} />
));

SuggestMobileInput.displayName = 'SuggestMobileInput';
