import React from 'react';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
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
    return <Input value={value?.label || ''} placeholder={placeholder} readOnly={true} aria-hidden="true" {...rest} />;
}
