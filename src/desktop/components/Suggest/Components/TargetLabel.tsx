import * as React from 'react';
import {ISuggestTargetProps, ISuggestOption} from '../types';

export function TargetLabel<T extends ISuggestOption>({
    renderTargetLabel,
    renderTargetInput,
    tabIndex,
    focused,
    opened,
    optionsLength,
    value,
    placeholder,
    query,
    setRef,
    loading,
    dataTestId,
    ...rest
}: ISuggestTargetProps<T>): JSX.Element {
    return <input value={value?.label || placeholder} readOnly={true} {...rest} />;
}
