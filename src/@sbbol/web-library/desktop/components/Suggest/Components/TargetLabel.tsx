import * as React from 'react';
import {ISuggestTargetProps, ISuggestOption} from '../types';

export function TargetLabel<T extends ISuggestOption>({
    renderTargetLabel,
    renderTargetInput,
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
    return <div {...rest}>{value?.label || placeholder}</div>;
}
