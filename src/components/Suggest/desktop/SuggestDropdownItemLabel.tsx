import React from 'react';
import {ISuggestDropdownItemLabelProps, ISuggestOption} from '../types';

export function SuggestDropdownItemLabel<T extends ISuggestOption>({option}: ISuggestDropdownItemLabelProps<T>): JSX.Element {
    return option.labelReactNode ? (option.labelReactNode as JSX.Element) : <span>{option.label}</span>;
}
